import { API_BASE } from "../constants";

export const login = async (email, password) => {
  const credentials = {
    email: email,
    password: password,
  };

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) {
      return { error: data.errors?.[0]?.message || "Login failed" };
    }

    const profile = JSON.stringify(data.data);
    localStorage.setItem("profile", profile);

    const token = data.data.accessToken;
    localStorage.setItem("token", token);

    return data;
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
};
