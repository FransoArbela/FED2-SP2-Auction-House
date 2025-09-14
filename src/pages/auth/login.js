import { login } from "../../api/auth/login.js";

const form = document.forms["loginForm"];
const errorDiv = document.getElementById("errorDiv");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await login(email, password);

  if (error) {
    errorDiv.textContent = error;
    errorDiv.classList.remove("hidden");
  } else {
    errorDiv.classList.add("hidden");
    const profile = localStorage.getItem("profile");
    const user = profile ? JSON.parse(profile) : null;

    window.location.href = `/pages/profile/profile.html?name=${user.name}`;
  }
});
