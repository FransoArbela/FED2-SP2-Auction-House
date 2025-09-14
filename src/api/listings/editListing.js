import { API_ACTION_LISTINGS } from "../constants";
import { apiKey } from "../auth/apiKey.js";

export const editListing = async (listingData, listingId) => {
  if (!listingData) return;
  const credentials = {
    title: listingData.title,
    description: listingData.description,
    tags: listingData.tags,
    media: listingData.media || [],
  };
  try {
    const response = await fetch(`${API_ACTION_LISTINGS}/${listingId}`, {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${await apiKey()}`,
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Failed to create listing");
    }
    // window.location.reload();
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating listing:", error);
    throw error;
  }
};
