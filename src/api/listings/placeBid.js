import { API_ACTION_LISTINGS } from "../constants";
import { apiKey } from "../auth/apiKey.js";

export const placeBid = async (value, id) => {
  if (!value || !id) return;
  const amount = parseInt(value);
  try {
    const response = await fetch(`${API_ACTION_LISTINGS}/${id}/bids`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "X-Noroff-API-Key": `${await apiKey()}`,
      },
      body: JSON.stringify({ amount }),
    });
    window.location.reload();
    if (!response.ok) throw new Error("Failed to place bid");
    const data = await response.json();
    console.log("Bid placed successfully:", data);
  } catch (error) {
    console.error("Error placing bid:", error);
  }
};
