import { API_ACTION_PROFILES } from "../constants.js";
import { apiKey } from "../auth/apiKey.js";
import { renderProfile } from "../../pages/profile/renderProfile.js";
const loadProfile = async () => {
  const url = new URL(window.location.href);
  const profileName = url.searchParams.get("name");
  if (!profileName) {
    console.error("No profile name specified in URL");
    return;
  }

  try {
    const response = await fetch(
      `${API_ACTION_PROFILES}/${profileName}?_listings=true&_wins=true`,
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
      throw new Error("Network response was not ok");
    }
    const profileData = await response.json();
    const credits = profileData.data.credits || 0;
    localStorage.setItem("credits", credits);
    renderProfile(profileData);
  } catch (error) {
    console.error("Error loading profile:", error);
  }
};

loadProfile();
