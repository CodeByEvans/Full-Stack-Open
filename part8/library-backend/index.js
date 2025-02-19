const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const DataLoader = require('dataloader')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/use/ws')

const http = require('http')
const express = require('express')
const mongoose = require('mongoose')
const { GraphQLError} = require('graphql')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

mongoose.set('strictQuery', false);
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })


const typeDefs = `

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!],
    me: User
  }

  type Subscription {
    bookAdded: Book!
  }

  type Mutation {
  addBook(
    title: String!
    published: Int!
    author: String!
    genres: [String!]
  ): Book
  editAuthor(
    name: String
    born: Int
  ): Author
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token
  }
`

const bookLoader = new DataLoader(async (authorIds) => {
  const books = await Book.find({ author: {$in: authorIds}})
  return authorIds.map(authorId =>
    books.filter(book => book.author.toString() === authorId.toString())
  )
})

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const filter = {}
      if (args.author) filter.author = args.author;
      if (args.genre) filter.genres = args.genre;
      return Book.find(filter).populate('author')
    },
    allAuthors: async () => {
      const authors = await Author.find()
      return authors
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (author) => {
      const books = await bookLoader.load(author._id.toString())
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const existingBook = await Book.findOne({title: args.title})
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if(existingBook) {
        throw new GraphQLError('This book already exists', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (args.title.length < 2) {
        throw new GraphQLError('Too short title', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      if (args.author.length < 2) {
        throw new GraphQLError('Too short author name', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        let author = await Author.findOne({name: args.author})
        if (!author) {
          author = new Author({ name: args.author})
          await author.save()
        }
  
        const book = new Book ({...args, author: author._id })
        await book.save()

        pubsub.publish('BOOK_ADDED', {bookAdded: await Book.findById(book._id).populate('author')})

        return await Book.findById(book._id).populate('author')
  
      } catch (error) {
        throw new GraphQLError('Adding book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      try {
        const author = await Author.findOneAndUpdate({name: args.name}, {born: args.born}, {new:true})
        if (!author) {
          return null
        }
        return author
      } catch (error) {
        throw new GraphQLError('Updating author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name, error
          }
        })
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre})

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating this user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name, error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.SECRET)}
    }
  },
  Subscription : {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

const start = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/'
  })

  const schema = makeExecutableSchema({ typeDefs, resolvers })
  const serverCleanup = useServer({ schema}, wsServer)

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({httpServer}),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            }
          }
        }
      }
    ]
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const auth = req ? req.headers.authorization : null
        if ( auth && auth.startsWith('Bearer ')) {
          const decodedToken = jwt.verify(
            auth.substring(7), process.env.SECRET
          )
          const currentUser = await User.findById(decodedToken.id)
          return { currentUser }
        }
      }
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () => 
  console.log(`Server is now running on http://localhost:${PORT}`))
}

start()