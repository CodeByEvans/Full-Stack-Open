import { useState } from 'react'
import { gql, useMutation } from "@apollo/client"
import { ALL_BOOKS } from '../queries'
import { updateCache } from '../App'
import { ALL_AUTHORS } from './Authors'

const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $genres:[String!], $author: String!) {
  addBook(
    title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    genres
    id
    published
    author {
      name
      born
    }
  }
}
`

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{query: ALL_AUTHORS}, {query: ALL_BOOKS}]
  });

  if (!props.show) {
    return null
  }


  const submit = async (event) => {
    event.preventDefault()

    const publishedInt = parseInt(published, 10)

    await addBook({ variables: {title, author, published: publishedInt, genres} })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook