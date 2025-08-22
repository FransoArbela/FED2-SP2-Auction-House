import { API_BASE } from "../constants";

const login = async (credentials) => {
const credentials = {
    email: "samibr02737@stud.noroff.no",
    password: "Mypassword12345",
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

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    const token = data.data.accessToken;

    const profile = JSON.stringify(data.data);

    localStorage.setItem("token", token);
    localStorage.setItem("profile", profile);
    loginListener();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { login };