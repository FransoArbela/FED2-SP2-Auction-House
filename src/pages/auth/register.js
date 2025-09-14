import { register } from "../../api/auth/register.js";

const form = document.getElementById("registerForm");
const errorDiv = document.getElementById("errorDiv");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await register(name, email, password);

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
