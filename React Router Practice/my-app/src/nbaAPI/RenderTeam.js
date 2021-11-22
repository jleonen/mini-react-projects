import { useState, useEffect, useCallback } from "react";
import TeamItem from "./TeamItem";
import classes from "./RenderTeam.module.css";

const RenderTeam = () => {
  const [east, setEast] = useState([]);
  const [west, setWest] = useState([]);
  const searcHandler = useCallback(async () => {
    const teamResponse = await fetch(
      "https://free-nba.p.rapidapi.com/teams?page=0",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "free-nba.p.rapidapi.com",
          "x-rapidapi-key":
            // ******REMOVE KEY PRIOR TO COMITTING***********
            "insert api key",
        },
      }
    );
    const teams = await teamResponse.json();
    const teamList = [...teams.data];
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
  }, []);
  useEffect(() => {
    searcHandler();
  }, [searcHandler]);
  return (
    <div className={classes.teamContainer}>
      <div className={classes.eastCon}>
        <h1 className={classes.eastHeader}>Eastern Conference </h1>
        {/* <div className={classes.eastResults}> */}
        {east.map((item) => (
          <li className={classes.eastItems}>
            <TeamItem
              fullName={item.full_name}
              abbreviation={item.abbreviation}
              city={item.city}
              division={item.division}
            />
          </li>
        ))}
        {/* </div> */}
      </div>
      <div className={classes.westCon}>
        <h1 className={classes.westHeader}>Western Conference </h1>
        {/* <div className={classes.westResults}> */}
        {west.map((item) => (
          <li className={classes.westItems}>
            <TeamItem
              fullName={item.full_name}
              abbreviation={item.abbreviation}
              city={item.city}
              division={item.division}
            />
          </li>
        ))}
        {/* </div> */}
      </div>
    </div>
  );
};

export default RenderTeam;
