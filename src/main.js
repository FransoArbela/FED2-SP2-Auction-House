import router, { setActiveLink } from "./router.js";
import "./styles/main.css";
import "../src/utils/nightmode.js";
import "./utils/burgerMenu.js";
import { isAuth } from "./utils/isAuth.js";
import { logout } from "./utils/logout.js";
import "https://kit.fontawesome.com/553a084866.js";

router();
setActiveLink();
logout();
isAuth();

window.addEventListener("DOMContentLoaded", () => {
  const profile = localStorage.getItem("profile");
  const profileName = profile ? JSON.parse(profile).name : null;
  const profileLinkElements = document.querySelectorAll("#profile-link");
  if (profileLinkElements && profileName) {
    profileLinkElements.forEach((profileLinkElement) => {
      profileLinkElement.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = `${window.location.origin}/pages/profile/profile.html?name=${profileName}`;
      });
    });
  }
  document.querySelectorAll("#bid-balance").forEach((el) => {
    el.textContent = `Balance: ${
      localStorage.getItem("credits") || "loading..."
    }`;
  });
});
