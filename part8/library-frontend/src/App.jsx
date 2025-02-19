import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";

import { useApolloClient, useSubscription } from "@apollo/client";
import { ALL_BOOKS, BOOK_ADDED } from "./queries";

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set();
    return a.filter((item) => {
      let k = item.title;
      return seen.has(k) ? false : seen.add(k);
    });
  };

  cache.updateQuery(query, ({ allBooks}) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    };
  });
};

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCache(client.cache, {query: ALL_BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token !== null && <button onClick={() => setPage('add')}>add book</button> }
        {token !== null && <button onClick={() => setPage("recommend")}>recommend</button>}
        {token !== null && <button onClick={logout}>logout</button>}
        {token === null && <button onClick={() => setPage("login")}>login</button>}
      </div>

      <Notify errorMessage={errorMessage}/>

      <Authors show={page === "authors"} setError={notify} />

      <Books show={page === "books"} client={client}/>

      <LoginForm show={page === "login"}
        setToken={setToken}
        setError={notify}
        setPage={setPage}
      />

      <NewBook show={page === "add"} />

      <Recommendations show={page === "recommend"}/>
    </div>
  );
};

export default App;
