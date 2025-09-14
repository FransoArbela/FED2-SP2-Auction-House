import { API_ACTION_PROFILES } from "../constants.js";
import { apiKey } from "../auth/apiKey.js";

export const updateProfile = async (profileData, userName) => {
  if (!profileData || !userName) return;
  const credentials = {
    avatar: {
      url: profileData.avatarUrl,
      alt: profileData.avatarAlt,
    },
    banner: {
      url: profileData.bannerUrl,
      alt: profileData.bannerAlt,
    },
    bio: profileData.bio,
  };

  try {
    const response = await fetch(`${API_ACTION_PROFILES}/${userName}`, {
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
      const errorData = await response.json();
      throw new Error(
        alert(`${errorData.errors?.[0]?.message || "Failed to update profile"}`)
      );
    }

    const updatedProfile = await response.json();
    window.location.reload();
    return updatedProfile;
  } catch (error) {
    throw error;
  }
};
