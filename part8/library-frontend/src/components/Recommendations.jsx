import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_FAVORITE_GENRE } from "../queries"
import { ALL_BOOKS } from "../queries"

const Recommendations = (props) => {
    const [favoriteGenre, setFavoriteGenre] = useState('erótico')
    const [recommendedBooks, setRecommendedBooks] = useState('null')

    const {data: genreData, loading: genreLoading} = useQuery(GET_FAVORITE_GENRE)
    const {data: booksData, loading: booksLoading} = useQuery(ALL_BOOKS)

    useEffect(() => {
        if (genreData && genreData.me) {
            setFavoriteGenre(genreData.me.favoriteGenre)

            console.log('genero favorito', favoriteGenre)
        }
    }, [genreData])

    useEffect(() => {
        if (booksData && favoriteGenre) {
            const allBooks = booksData.allBooks
            const filteredBooks = allBooks.filter((book) => book.genres.includes(favoriteGenre))

            setRecommendedBooks(filteredBooks)
        }
    }, [booksData, favoriteGenre])


    if (!props.show) {
        return null
    }
    return (
        <div>
            <h2>recommendations</h2>
            <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
            <th>genre</th>
          </tr>
          {recommendedBooks.map(b => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
              <td>{b.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
    )
}

export default Recommendations