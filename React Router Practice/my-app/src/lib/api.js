const BASE_URL = "https://free-nba.p.rapidapi.com/";
// ******REMOVE BEFORE COMMITING AND PUSHING TO GIT
const API_KEY = "873168d921msh5a662a58c6288f4p129c32jsn6f5a1e8e9f38";

export async function getTeams() {
  const response = await fetch(`${BASE_URL}/teams?page=0`, {
    //   const response = await fetch(`https://free-nba.p.rapidapi.com/teams?page=0`, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "free-nba.p.rapidapi.com",
      // ******REMOVE KEY PRIOR TO COMITTING***********
      "x-rapidapi-key": `${API_KEY}`,
    },
  });
  const teams = await response.json();

  if (!response.ok) {
    throw new Error("Could not load teams. Please try again later");
  }
  const teamList = [...teams.data];
  const easternTeam = teamList.filter((team) => team["conference"] === "East");
  const westernTeam = teamList.filter((team) => team["conference"] === "West");
  return {
    easternTeam,
    westernTeam,
  };
}

export async function getPlayer(searchData) {
  const response = await fetch(
    `${BASE_URL}/players?page=0&per_page=25&search=${searchData}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "free-nba.p.rapidapi.com",
        // ******REMOVE KEY PRIOR TO COMITTING***********
        "x-rapidapi-key": `${API_KEY}`,
      },
    }
  );
  const result = await response.json();
  console.log(result.data);
  console.log(result.data[0]["first_name"]);
  if (!response.ok) {
    throw new Error("Could not load teams. Please try again later");
  }
  return result;
}
