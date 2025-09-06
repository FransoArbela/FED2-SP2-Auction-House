import  router, {setActiveLink}  from "./router.js";
import "./styles/main.css"
import "https://kit.fontawesome.com/553a084866.js";
import "../src/utils/nightmode.js"
import { logout } from "./utils/logout.js";
import { isAuth } from "./utils/isAuth.js";

router();
setActiveLink();
logout();
isAuth();

window.addEventListener("DOMContentLoaded", ()=> {
const profile= localStorage.getItem("profile");
const profileName = profile ? JSON.parse(profile).name : null;
const profileLinkElement = document.getElementById("profile-link");
if (profileLinkElement && profileName) {
    profileLinkElement.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = `${window.location.origin}/pages/profile/profile.html?name=${profileName}`;
    });
}
});


