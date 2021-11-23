import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import classes from "./RenderPlayer.module.css";
import { getPlayer } from "../lib/api";

const RenderPlayer = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [emptyResults, setEmptyResults] = useState(false);

  const searchHandler = async (data) => {
    setIsLoading(true);
    setError(null);
    setEmptyResults(false);
    const searchData = data.split(" ").join("%20");
    try {
      const result = await getPlayer(searchData);
      result.data.length === 0 && setEmptyResults(true);
      setResults([...result.data]);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  let content = results.map((player) => (
    <li>
      <SearchResults
        firstName={player.first_name}
        lastName={player.last_name}
        heightFt={player.height_feet ? `${player.height_feet} ft` : "No data"}
        heightIn={player.height_inches ? `${player.height_inches} in` : ""}
        position={player.position ? player.position : "No data"}
        team={player["team"].full_name ? player["team"].full_name : "No data"}
        // firstName={player[i]["first_name"]}
        // lastName={player[i]["last_name"]}
        // heightFt={
        //   player[i]["height_feet"]
        //     ? `${player[i]["height_feet"]} ft`
        //     : "No data"
        // }
        // heightIn={
        //   player[i]["height_inches"] ? `${player[i]["height_inches"]} in` : ""
        // }
        // position={player[i]["position"] ? player[i]["position"] : "No data"}
        // team={
        //   player[i]["team"]["full_name"]
        //     ? player[i]["team"]["full_name"]
        //     : "No data"
        // }
      />
    </li>
  ));
  // }

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
