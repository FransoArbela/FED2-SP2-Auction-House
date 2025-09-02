import { API_ACTION_LISTINGS } from "../constants";

export const singleListing = async (id) => {
  try {
    const response = await fetch(
      `${API_ACTION_LISTINGS}/${id}?_seller=true&_bids=true`,
      {
        headers: { accept: "application/json" },
        cache: "no-store",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch listing");
    }
    const data = await response.json();
    console.log(data);
    return data;

  } catch (error) {
    console.error("Error fetching single listing:", error);
    throw error;
  }
};

