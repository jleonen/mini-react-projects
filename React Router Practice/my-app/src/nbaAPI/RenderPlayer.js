import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import classes from "./RenderPlayer.module.css";

const RenderPlayer = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchHandler = async (data) => {
    setIsLoading(true);
    setError(null);
    const searchData = data.split(" ").join("%20");
    console.log(searchData);
    try {
      const response = await fetch(
        `https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=${searchData}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            "x-rapidapi-key":
              "3167f09b7emsh7b10a102b88ec55p19d6c9jsn03e7c2824144",
          },
        }
      );
      console.log(response);
      const result = await response.json();
      setResults([...result.data]);
      //   setResults(
      //     result.data.map((item) => {
      //       return {
      //         key: Math.random(),
      //         id: Math.random(),
      //         first_name: item.first_name,
      //         last_name: item.last_name,
      //       };
      //     })
      //   );
      //   console.log(results);
      //   results.map((item) => {
      //     console.log(item.last_name);
      //   });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  let content;
  //   if (!isLoading) {
  //     content = <p>Use search bar to start looking for an NBA player</p>;
  //   } else {
  //     content = <p>Loading results....</p>;
  //   }

  //   if (error) {
  //     content = <p>{error} </p>;
  //   }

  if (results.length === 0) {
    content = <p>No player found. Try again.</p>;
  } else {
    content = results.map((player) => (
      <li>
        <SearchResults
          firstName={player.first_name}
          lastName={player.last_name}
        />
      </li>
    ));
  }
  return (
    <div className={classes.resultsContainer}>
      <SearchBar onSearch={searchHandler} />
      {error && <p>{error}</p>}
      {isLoading && <p>Loading data....</p>}
      <ul className={classes.resultList}>{content}</ul>
    </div>
  );
};

export default RenderPlayer;
