import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import { useState } from "react";
import { useEffect } from "react";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (result && result.data) {
      const allBooks = result.data.allBooks;
      setBooks(allBooks);
      let genres = ["All genres"];
      allBooks.forEach((element) => {
        element.genres.forEach((g) => {
          if (genres.indexOf(g) === -1) {
            genres.push(g);
          }
        });
      });
      setGenres(genres);
      setSelectedGenre("All genres");
    }
  }, [result.data]);

  useEffect(() => {
    if (selectedGenre === "All genres") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter((b) => b.genres.indexOf(selectedGenre) !== -1)
      );
    }
  }, [books, selectedGenre]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading....</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
        </thead>

        <tbody>
          {filteredBooks?.map((item, index) => (
            <tr key={index}>
              <td>{item.title}</td>
              <td>{item.author.name}</td>
              <td>{item.published}</td>
              <td>{item.genres}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />

      {genres.length > 0 &&
        genres.map((g) => (
          <button onClick={() => setSelectedGenre(g)} key={g}>
            {g}
          </button>
        ))}
    </div>
  );
};

export default Books;
