import { API_ACTION_PROFILES } from "../constants.js";
import { apiKey } from "../auth/apiKey.js";

export const getBiddedListings = async () => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (!profile) return;
    const userName = profile.name;
    try {
        const response = await fetch(`${API_ACTION_PROFILES}/${userName}/bids?_listings=true`, {
            method: "GET",
            headers: {
                accept: "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                "X-Noroff-API-Key": await apiKey()
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Error loading bidded listings:", error);
    }
}