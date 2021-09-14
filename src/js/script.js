const text_fade_styles = ["fade-in-right-1", "fade-in-right-2", "fade-in-right-3", "fade-in-left-1", "fade-in-left-2", "fade-in-left-3"];
const preloader = document.querySelector(".preloader");
const slide_nav_btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".hero__slide");
const top_feat_cats = document.querySelectorAll(".top-featured__cat");
const countdown_items = [
    document.querySelector(".days-amount"),
    document.querySelector(".hours-amount"),
    document.querySelector(".minutes-amount"),
    document.querySelector(".seconds-amount"),
];

/* -------------------------
Functions
 ------------------------- */

function timeOuts(){
    setTimeout(() => {
        const fade_imp = document.querySelectorAll(".fade-imp");
        fade_imp.forEach((item) => {
            item.classList.add("appear");
        });
    });
    
    setTimeout(() => {
        const fade = document.querySelectorAll(".fade");
        fade.forEach((item) => {
            item.classList.add("appear");
        });
    }, 1000);
}

function removeAllFades(items){
    items.forEach((item) => {
        text_fade_styles.forEach((fade) => {
            item.classList.remove(fade);
        });
    });
}

let autoplay_interval;
function autoPlay(){
    let cur_index = 1;
    autoplay_interval = setInterval(() => {
        if (cur_index > 2){
            cur_index = 0;
        }
        slide_nav_btns[cur_index].click(); // automatically clicking the next slide (reduces flexibility of code - but it works)
        cur_index++;
    }, 10000);
}
/* -------------------------
End Functions
 ------------------------- */


// Execute when HTML is done loading
window.addEventListener("load", () => {
    preloader.classList.add("disappear");

    timeOuts();
    setTimeout(autoPlay, 2000);

    for (let i = 0; i < slide_nav_btns.length; ++i) {
        slide_nav_btns[i].addEventListener("click", () => {
            slide_nav_btns.forEach((item) => {
                item.classList.remove("active");
            });
            slides.forEach((item) => {
                item.classList.remove("active");
                removeAllFades([item.querySelector(".hero__img-wrapper"), item.querySelector(".hero__top-text"), item.querySelector(".hero__bottom-text"), item.querySelector(".hero__extra-text")]);
                item.querySelector(".hero__cta").classList.remove("fade", "fade-in-bottom");
                const all_appear = item.querySelectorAll(".appear");
                all_appear.forEach((item) => {
                    item.classList.remove("appear");
                });
            });

            slide_nav_btns[i].classList.add("active");
            slides[i].classList.add("active");
            if (i === 1) {
                // possible feature:  pick randomly
                slides[i].querySelector(".hero__img-wrapper").classList.add("fade-imp", "fade-in-left-2");
            } else if (i === 2) {
                slides[i].querySelector(".hero__img-wrapper").classList.add("fade-imp", "fade-in-flat-top");
            } else {
                slides[i].querySelector(".hero__img-wrapper").classList.add("fade-imp", "fade-in-bottom");
            }

            // console.log(slides[i], slides[i].querySelector(".hero__img-wrapper").classList); - BUG: slides dont get animated when transitioning sometimes
            let val = Math.floor(Math.random() * text_fade_styles.length);
            let val2 = Math.floor(Math.random() * text_fade_styles.length);
            let rand = text_fade_styles[val];
            let rand2 = text_fade_styles[val2];
            // console.log(val, val2, rand, rand2);
            slides[i].querySelector(".hero__top-text").classList.add("fade", `${rand}`);
            slides[i].querySelector(".hero__bottom-text").classList.add("fade", `${rand2}`);
            slides[i].querySelector(".hero__extra-text").classList.add("fade", `${rand}`);
            slides[i].querySelector(".hero__cta").classList.add("fade", "fade-in-bottom");

            timeOuts();
        });
    }

    top_feat_cats.forEach((item) => {
        item.addEventListener("click", () => {
            top_feat_cats.forEach((item) => {
                item.classList.remove("top-featured__cat--active");
            });
            item.classList.add("top-featured__cat--active");
            console.log("done");
        });
    });

    // Function to get Remaining Time for Countdown Timer
    // Had to bring it in here because of scoping issues
    function getRemainingTime() {
        const today = new Date().getTime();
        const difference = future_date_in_ms - today;

        // Time values in milliseconds
        const one_day = 24 * 60 * 60 * 1000;
        const one_hour = 60 * 60 * 1000;
        const one_minute = 60 * 1000;

        let days = Math.floor(difference / one_day);
        let hours = Math.floor((difference % one_day) / one_hour);
        let minutes = Math.floor((difference % one_hour) / one_minute);
        let seconds = Math.floor((difference % one_minute) / 1000);
        // console.log(days, hours, minutes, seconds);

        const values = [days, hours, minutes, seconds];
        countdown_items.forEach((item, index) => {
            item.textContent = String(values[index]).padStart(2, "0");
        });

        if (difference < 0) {
            clearInterval(countdown);
            countdown_items.forEach((item) => {
                item.textContent = "00";
            });
        }
    }

    const temp_date = new Date();
    const temp_year = temp_date.getFullYear();
    const temp_month = temp_date.getMonth();
    const temp_day = temp_date.getDate();
    const temp_hours = temp_date.getHours();
    const temp_mins = temp_date.getMinutes();
    const future_date = new Date(temp_year, temp_month, temp_day+3, temp_hours, temp_mins, 0);
    // console.log(future_date)

    // Convert future date to ms
    const future_date_in_ms = future_date.getTime();

    let countdown = setInterval(getRemainingTime, 1000);
    getRemainingTime(); // important to invoke function after setInterval in order to have access to the countdown variable
});