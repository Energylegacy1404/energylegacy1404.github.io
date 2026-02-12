const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const scrollUpImg = document.getElementById('scrollup');
const scrollDownImg = document.getElementById('scrolldown');

const lightBulbOn = 'assets/img/4photoshop-ir-icon-lamp-rooz.png';
const lightBulbOff = 'assets/img/4photoshop-ir-icon-lamp-shab.png';


/* خواندن تم ذخیره شده */
let darkMode = localStorage.getItem("theme") === "dark";
/* اعمال تم هنگام لود */
applyTheme();


/* کلیک */
toggleBtn.addEventListener('click', () => {
    darkMode = !darkMode;
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    applyTheme();
});

function applyTheme() {

    if (darkMode) {
        body.classList.add('theme-dark');
        toggleBtn.src = lightBulbOff;

        if (scrollUpImg) scrollUpImg.src = scrollUpDark;
        if (scrollDownImg) scrollDownImg.src = scrollDownDark;

    } else {
        body.classList.remove('theme-dark');
        toggleBtn.src = lightBulbOn;

        if (scrollUpImg) scrollUpImg.src = scrollUpLight;
        if (scrollDownImg) scrollDownImg.src = scrollDownLight;
    }
}