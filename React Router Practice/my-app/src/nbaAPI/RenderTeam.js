import SearchBar from "./SearchBar";
import { useState } from "react";
import TeamItem from "./TeamItem";
import classes from "./RenderTeam.module.css";

const RenderTeam = () => {
  const [east, setEast] = useState([]);
  const [west, setWest] = useState([]);
  const searcHandler = async () => {
    const teamResponse = await fetch(
      "https://free-nba.p.rapidapi.com/teams?page=0",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "free-nba.p.rapidapi.com",
          "x-rapidapi-key":
            // ******REMOVE KEY PRIOR TO COMITTING***********
            "insert api key here",
        },
      }
    );
    const teams = await teamResponse.json();
    const teamList = [...teams.data];
    console.log(teamList[0]["conference"]);
    //const result = words.filter(word => word.length > 6);
    setEast(teamList.filter((team) => team["conference"] === "East"));
    setWest(teamList.filter((team) => team["conference"] === "West"));
    //Atlantic, Central, Southeast (Eastern Conference) and Northwest, Pacific, Southwest
    // const playerResponse = for (let i = 0; i <= 38; i++) {
    //     const playerResponse = await fetch(
    //         `https://free-nba.p.rapidapi.com/players?page=${i}&per_page=5000`,
    //         {
    //           method: "GET",
    //           headers: {
    //             "x-rapidapi-host": "free-nba.p.rapidapi.com",
    //             "x-rapidapi-key":
    //               "",
    //           },
    //         }
    //       );
    //       const players = await playerResponse.json();
    //playerList.push(players.data);
    // }
    //LOADING ALL PLAYERS

    // for (let i = 0; i <= 38; i++) {
    //   const playerResponse = await fetch(
    //     `https://www.balldontlie.io/api/v1/players?page=${i}&per_page=100`
    //   );
    //   const players = await playerResponse.json();
    //   playerList.push(players.data);
    // }

    //const players = await playerResponse.json();
    // console.log(playerList);
    // playerList.forEach((item, i) => {
    //   console.log(item[i]);
    // });
  };
  return (
    <div className={classes.teamContainer}>
      <SearchBar onSearch={searcHandler} />
      <div className={classes.westCon}>
        <h1>Eastern Conference </h1>
        {east.map((item) => (
          <li>
            <TeamItem
              fullName={item.full_name}
              abbreviation={item.abbreviation}
              city={item.city}
              division={item.division}
            />
          </li>
        ))}
      </div>
      <div className={classes.eastCon}>
        <h1>Western Conference </h1>
        {west.map((item) => (
          <li>
            <TeamItem
              fullName={item.full_name}
              abbreviation={item.abbreviation}
              city={item.city}
              division={item.division}
            />
          </li>
        ))}
      </div>
    </div>
  );
};

export default RenderTeam;
