import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import classes from "./RenderPlayer.module.css";
import { getPlayer, getTeams } from "../lib/api";
import useHttp from "../hooks/use-http";

const RenderPlayer = () => {
  // const [results, setResults] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [emptyResults, setEmptyResults] = useState(false);
  const { sendRequest, status, data: results, error } = useHttp(getPlayer);

  const searchHandler = (data) => {
    sendRequest(data);
    // setIsLoading(true);
    // setError(null);
    //setEmptyResults(false);
    // const searchData = data.split(" ").join("%20");
    // try {
    //   const result = await getPlayer(searchData);
    //   result.data.length === 0 && setEmptyResults(true);
    //   setResults([...result.data]);
    // } catch (error) {
    //   setError(error.message);
    // }
    // setIsLoading(false);
  };

  let content;

  //if (results.length === 0) {
  if (!status) {
    content = <p>No player found. Try again.</p>;
  } else {
    content = results.map((player, i) => (
      <li>
        <SearchResults
          // firstName={player.first_name}
          // lastName={player.last_name}
          // heightFt={player.height_feet ? `${player.height_feet} ft` : "No data"}
          // heightIn={player.height_inches ? `${player.height_inches} in` : ""}
          // position={player.position ? player.position : "No data"}
          // team={player["team"].full_name ? player["team"].full_name : "No data"}
          firstName={player[i]["first_name"]}
          lastName={player[i]["last_name"]}
          heightFt={
            player[i]["height_feet"]
              ? `${player[i]["height_feet"]} ft`
              : "No data"
          }
          heightIn={
            player[i]["height_inches"] ? `${player[i]["height_inches"]} in` : ""
          }
          position={player[i]["position"] ? player[i]["position"] : "No data"}
          team={
            player[i]["team"]["full_name"]
              ? player[i]["team"]["full_name"]
              : "No data"
          }
        />
      </li>
    ));
  }

  return (
    <div className={classes.resultsContainer}>
      <SearchBar onSearch={searchHandler} />
      {error && <p>{error}</p>}
      {status === "loading" && <p>Loading data....</p>}
      {emptyResults && <p>No player found. Try again.</p>}
      <ul className={classes.resultList}>{content}</ul>
    </div>
  );
};

export default RenderPlayer;
