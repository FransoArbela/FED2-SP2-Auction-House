import { API_AUTH_KEY } from "../constants";

export const apiKey = async () => {
  try {
    const response = await fetch(
      API_AUTH_KEY,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: "New API Key",
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.data.key;
  } catch (error) {
    console.error("Error creating API key:", error);
  }
};

