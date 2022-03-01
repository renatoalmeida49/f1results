import { api as API} from "@/services/api";

export const allSeasons = async () => {
  try {
    const response = await API.get("seasons.json?limit=200");

    return response.data.MRData.SeasonTable.Seasons;
  } catch (error) {
    console.error("Something went wrong!", error);
  }
}