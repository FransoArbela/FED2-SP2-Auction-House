import { API_AUTH_REGISTER } from "../constants";

export async function register(name, email, password) {
  const payload = {
    name,
    email,
    password,
  };
  try {
    const response = await fetch(`${API_AUTH_REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!response.ok) {
      return { error: data.errors?.[0]?.message || "Registration failed" };
    }
    return data;
  } catch (err) {
    return { error: "Network error. Please try again." };
  }
}
