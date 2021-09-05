const preloader = document.querySelector(".preloader");
const text_fade_styles = ["fade-in-right-1", "fade-in-right-2", "fade-in-right-3", "fade-in-left-1", "fade-in-left-2", "fade-in-left-3"];
const slide_nav_btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".hero-slides__slide");


window.addEventListener("load", () => {
    preloader.classList.add("disappear");

    timeOuts();
    setTimeout(autoPlay, 2000);
});

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


for (let i = 0; i < slide_nav_btns.length; ++i) {
    slide_nav_btns[i].addEventListener("click", () => {
        slide_nav_btns.forEach((item) => {
            item.classList.remove("active");
        });
        slides.forEach((item) => {
            item.classList.remove("active");
            removeAllFades([
                item.querySelector(".hero-slides__img-wrapper"),
                item.querySelector(".hero-slides__top-text"),
                item.querySelector(".hero-slides__bottom-text"),
                item.querySelector(".hero-slides__extra-text")
            ]);
            item.querySelector(".hero-slides__cta").classList.remove("fade", "fade-in-bottom");
            const all_appear = item.querySelectorAll(".appear");
            all_appear.forEach((item) => {
                item.classList.remove("appear");
            });
        });

        slide_nav_btns[i].classList.add("active");
        slides[i].classList.add("active");
        if (i === 1){ // possible feature:  pick randomly
            slides[i].querySelector(".hero-slides__img-wrapper").classList.add("fade-imp", "fade-in-left-2");
        } else if (i === 2){
            slides[i].querySelector(".hero-slides__img-wrapper").classList.add("fade-imp", "fade-in-flat-top");
        } 
        else {
            slides[i].querySelector(".hero-slides__img-wrapper").classList.add("fade-imp", "fade-in-bottom");
        }

        console.log(slides[i], slides[i].querySelector(".hero-slides__img-wrapper").classList);
        let val = Math.floor(Math.random() * (text_fade_styles.length));
        let val2 = Math.floor(Math.random() * (text_fade_styles.length));
        let rand = text_fade_styles[val];
        let rand2 = text_fade_styles[val2];
        // console.log(val, val2, rand, rand2);
        slides[i].querySelector(".hero-slides__top-text").classList.add("fade", `${rand}`);
        slides[i].querySelector(".hero-slides__bottom-text").classList.add("fade", `${rand2}`);
        slides[i].querySelector(".hero-slides__extra-text").classList.add("fade", `${rand}`);
        slides[i].querySelector(".hero-slides__cta").classList.add("fade", "fade-in-bottom");

        timeOuts();
    });
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
        slide_nav_btns[cur_index].click();
        cur_index++;
    }, 10000);
}