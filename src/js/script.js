const preloader = document.querySelector(".preloader");
const s = document.querySelectorAll(".header__bottom-nav-btn")[1];

window.addEventListener("load", () => {
    preloader.classList.add("disappear");
})

s.addEventListener("click", () => {
    console.log("btn clicked")
})