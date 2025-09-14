import { API_ACTION_LISTINGS } from "../constants";
import { apiKey } from "../auth/apiKey.js";

export const deleteListing = async (listingId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_ACTION_LISTINGS}/${listingId}`, {
      method: "DELETE",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${await apiKey()}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete listing");
    }
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
};
