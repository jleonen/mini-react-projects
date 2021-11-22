import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import classes from "./RenderPlayer.module.css";

const RenderPlayer = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emptyResults, setEmptyResults] = useState(false);
  let content;
  const searchHandler = async (data) => {
    setIsLoading(true);
    setError(null);
    setEmptyResults(false);
    const searchData = data.split(" ").join("%20");
    console.log(searchData);
    try {
      const response = await fetch(
        `https://free-nba.p.rapidapi.com/players?page=0&per_page=25&search=${searchData}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            // ******REMOVE KEY PRIOR TO COMITTING***********
            "x-rapidapi-key": "",
          },
        }
      );
      const result = await response.json();
      //console.log(result.data[0]["team"].full_name);
      result.data.length === 0 && setEmptyResults(true);
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
          heightFt={player.height_feet ? `${player.height_feet} ft` : "No data"}
          heightIn={
            player.height_inches ? `${player.height_inches} in` : "No data"
          }
          position={player.position ? player.position : "No data"}
          team={player["team"].full_name ? player["team"].full_name : "No data"}
        />
      </li>
    ));
  }

  return (
    <div className={classes.resultsContainer}>
      <SearchBar onSearch={searchHandler} />
      {error && <p>{error}</p>}
      {isLoading && <p>Loading data....</p>}
      {emptyResults && <p>No player found. Try again.</p>}
      <ul className={classes.resultList}>{content}</ul>
    </div>
  );
};

export default RenderPlayer;
