import { useState, useEffect, useCallback } from "react";
import TeamItem from "./TeamItem";
import classes from "./RenderTeam.module.css";
import { getTeams } from "../lib/api";

const RenderTeam = () => {
  const [east, setEast] = useState([]);
  const [west, setWest] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchHandler = useCallback(async () => {
    setError(false);
    setIsLoading(true);
    try {
      const teamList = await getTeams();
      const { westernTeam, easternTeam } = teamList;
      setEast(easternTeam);
      setWest(westernTeam);
      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    searchHandler();
  }, [searchHandler]);
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
      {error && (
        <p className={classes.errorMsg}>
          Something went wrong. Refresh the page or try again later.{" "}
        </p>
      )}
      {isLoading && <p className={classes.loadingMsg}>Loading teams.....</p>}
    </div>
  );
};

export default RenderTeam;
