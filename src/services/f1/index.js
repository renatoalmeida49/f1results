import { api as API} from "@/services/api";

export const allSeasons = async () => {
  try {
    const response = await API.get("seasons.json?limit=200");

    return response.data.MRData.SeasonTable.Seasons.map(season => season.season).reverse();
  } catch (error) {
    console.error("Something went wrong getting all seasons!", error);
    
    return []
  }
}

export const racesOfTheSeason = async (year) => {
  if (year) {
    try {
      const response = await API.get(`${year}.json`);

      return response.data.MRData.RaceTable.Races;
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
}

export const qualifying = async (year, round) => {
  try {
    const response = await API.get(`${year}/${round}/qualifying.json`);

    return response.data.MRData.RaceTable.Races[0]?.QualifyingResults || [];
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

export const race = async (year, round) => {
  try {
    const response = await API.get(`${year}/${round}/results.json`);

    return response.data.MRData.RaceTable.Races[0]?.Results || [];
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

export const championship = async (year, round) => {
  try {
    const response = await API.get(`${year}/${round}/driverstandings.json`);

    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings || [];
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}

export const raceStats = async (year, round) => {
  try {
    const response = await Promise.all([
      API.get(`${year}/${round}/qualifying.json`),
      API.get(`${year}/${round}/results.json`),
      API.get(`${year}/${round}/driverstandings.json`)
    ])

    return {
      qualifying: response[0].data.MRData.RaceTable.Races[0]?.QualifyingResults || [],
      race: response[1].data.MRData.RaceTable.Races[0]?.Results || [],
      standings: response[2].data.MRData.StandingsTable.StandingsLists[0].DriverStandings || [],
    };
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}