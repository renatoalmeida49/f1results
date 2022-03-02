import { api as API} from "@/services/api";

export const allSeasons = async () => {
  try {
    const response = await API.get("seasons.json?limit=200");

    return response.data.MRData.SeasonTable.Seasons;
  } catch (error) {
    console.error("Something went wrong!", error);
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