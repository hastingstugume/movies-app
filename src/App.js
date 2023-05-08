import React, { useState, useCallback, useEffect } from "react";
import AddMovie from "./components/AddMovie";
import "./App.css";
import MoviesList from "./components/MoviesList";

function App() {
  // const [data, setData] = useState({});
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //getting movies
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://movies-app-791c8-default-rtdb.firebaseio.com/movies.json"
      );
      if (response.body === null) {
        throw new Error(
          "Something went wrong! Probably nothing in the database."
        );
      }
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      const storedMovies = [];
      for (const key in data) {
        storedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(storedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // adding movies
  async function addMovieHandler() {
    // const movieData = await fetch(
    //   "https://movies-app-791c8-default-rtdb.firebaseio.com/movies.json",
    //   {
    //     method: "POST",
    //     body: {
    //       username: "icta",
    //       password: "stride",
    //     },
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // const data = await movieData.json();
    // setData(data);
    // console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={addMovieHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
