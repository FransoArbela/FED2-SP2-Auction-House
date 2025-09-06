import { API_BASE } from "../constants";

const login = async (email, password) => {
const credentials = {
    email: email,
    password: password,
  };

  console.log("Logging in with:", credentials);

  try {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();

    const profile = JSON.stringify(data.data);
    localStorage.setItem("profile", profile);

    const token = data.data.accessToken;
    localStorage.setItem("token", token);

    return data;

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };