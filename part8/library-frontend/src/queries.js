import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`
export const GET_FAVORITE_GENRE = gql`
  query Me {
    me {
      favoriteGenre
    }
  }
`

export const ALL_BOOKS = gql`
query AllBooks($genre: String){ 
  allBooks (genre: $genre){
    title
    published
    genres
    author {
      name
      born
    }
  }
}
`

export const BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      author {
        name
      }
      title
      published
      genres
    }
  }
`;

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      name
      born
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`