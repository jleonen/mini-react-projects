import { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

const RenderPlayer = () => {
  const [results, setResults] = useState([]);
  const searchHandler = async (data) => {
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
              "5ac30b084bmsh0cbed315ffdbb37p1a4bd6jsn5191d37aa887",
          },
        }
      );
      console.log(response);
      const result = await response.json();
      setResults([...result.data]);
      results.map((item) => {
        // console.log(item.first_name);
        console.log(item.last_name);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ul>
        {results.map((player) => (
          <li>
            <SearchResults
              firstName={player.first_name}
              lastName={player.last_name}
            />
          </li>
        ))}
      </ul>
      <SearchBar onSearch={searchHandler} />
    </div>
  );
};

export default RenderPlayer;
