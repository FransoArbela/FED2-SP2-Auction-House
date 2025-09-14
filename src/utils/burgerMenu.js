const burgerBtn = document.querySelector("#burger-btn");
const navMenu = document.querySelector("#mobile-menu-wrapper");

burgerBtn.addEventListener("click", () => {
    console.log("clicked");
    navMenu.classList.toggle("hidden");
    navMenu.classList.toggle("flex");
});
