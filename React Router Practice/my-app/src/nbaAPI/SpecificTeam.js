import { useParams } from "react-router";
import { getSpecificTeam } from "../lib/api";
import { useCallback, useEffect, useState } from "react";
const SpecificTeam = () => {
  const [data, setData] = useState([]);
  const team = useParams();
  const searchHandler = useCallback(async () => {
    const teamInfo = await getSpecificTeam(team.team);
    console.log(teamInfo);
    const { abbreviation, city, full_name, conference } = teamInfo[0];
    console.log(city);
    setData([...teamInfo][0]);
  }, []);
  const { abbreviation, city, full_name, conference } = data;
  useEffect(() => {
    searchHandler();
  }, [searchHandler]);
  return (
    <div>
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
