import { useParams } from "react-router";
import { getSpecificTeam } from "../lib/api";
import { useCallback, useEffect, useState } from "react";
import classes from "./SpecificTeam.module.css";
const SpecificTeam = () => {
  const [data, setData] = useState([]);
  const team = useParams();
  const searchHandler = useCallback(async () => {
    const teamInfo = await getSpecificTeam(team.team);
    setData([...teamInfo][0]);
  }, [team.team]);
  const { abbreviation, city, full_name, conference } = data;
  useEffect(() => {
    searchHandler();
  }, [searchHandler]);
  return (
    <div className={classes.teamContainer}>
      <h1>{full_name}</h1>
      <h2>{abbreviation}</h2>
      <p>
        <strong>City:</strong> {city}
      </p>
      <p>
        <strong>Conference:</strong> {conference}
      </p>
    </div>
  );
};

export default SpecificTeam;
