import { API_ACTION_PROFILES } from "../constants";
import { apiKey } from "../auth/apiKey.js";

export const getWinListings = async () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  if (!profile) throw new Error("No profile found in localStorage");
  const userName = profile.name;
  try {
    const response = await fetch(
      `${API_ACTION_PROFILES}/${userName}/wins?_listings=true`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "X-Noroff-API-Key": await apiKey(),
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch win listings");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching win listings:", error);
    return [];
  }
};
