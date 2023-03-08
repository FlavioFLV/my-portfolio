/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
      navToggle = document.getElementById("nav-toggle"),
      navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener("click", () => {
        themeMenu.classList.remove("show__theme-menu");
        navMenu.classList.add("show-menu");
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove("show-menu");
    })
}

/*==================== MENU THEME SHOW HIDDEN ====================*/
const themeMenu = document.getElementById("theme-menu"),
      paletteButton = document.getElementById("palette-button"),
      themeColorButton = document.querySelectorAll(".theme__color"),
      selectedPalette = localStorage.getItem("selected-palette"),
      selectedThemeColor = localStorage.getItem("selected-theme-button");

const revomeClassThemeColor = () => {
    themeColorButton.forEach(el => {
        el.classList.remove("active-theme");
    })
}

document.documentElement.style.setProperty('--hue-color', selectedPalette);
if (selectedThemeColor) {
    revomeClassThemeColor();
    themeColorButton[selectedThemeColor].classList.add("active-theme");
}

paletteButton.addEventListener("click", () => {
    themeMenu.classList.toggle("show__theme-menu");
    
    themeColorButton.forEach((themeColor, index) => {
        themeColor.addEventListener("click", () => {
            const colorValue = themeColor.getAttribute("value");
            
            revomeClassThemeColor();
            themeColor.classList.add("active-theme");
            
            document.documentElement.style.setProperty('--hue-color', colorValue)
            localStorage.setItem("selected-palette", colorValue);
            localStorage.setItem("selected-theme-button", index)
            
            themeMenu.classList.remove("show__theme-menu");
        })
    })
})

window.addEventListener("scroll", () => {
    setTimeout(() => {
        themeMenu.classList.remove("show__theme-menu");
    }, 500)
})

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link")

function linkAction(){
    const navMenu = document.getElementById("nav-menu")
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove("show-menu")
}
navLink.forEach(link => link.addEventListener("click", linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName("skills__content"),
      skillsHeader = document.querySelectorAll(".skills__header");

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = "skills__content skills__close";
    }
    if (itemClass === "skills__content skills__close") {
        this.parentNode.className = "skills__content skills__open";
    }
}

skillsHeader.forEach(el => {
    el.addEventListener("click", toggleSkills );
})

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
      tabContents = document.querySelectorAll("[data-content]");

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const target = document.querySelector(tab.dataset.target);

        tabContents.forEach(tabContent => {
            tabContent.classList.remove("qualification__active");
        })
        target.classList.add("qualification__active");

        tabs.forEach(tab => {
            tab.classList.remove("qualification__active");
        })
        tab.classList.add("qualification__active");
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper(".portfolio__container", {
    cssMode: true,
    grabCursor: true,
    // loop: true,

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.add("active-link");
        } else {
            document.querySelector(`.nav__menu a[href*=${sectionId}]`).classList.remove("active-link");
        }
    });
}
window.addEventListener("scroll", scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 

function scrollHeader() {
    const nav = document.getElementById("header");
    if (this.scrollY >= 80) {
        nav.classList.add("scroll-header");
    } else {
        nav.classList.remove("scroll-header");
    };
};
window.addEventListener("scroll", scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp() {
    const scrollUp = document.getElementById("scroll-up");

    if (this.scrollY >= 80) {
        scrollUp.classList.add("show-scroll");
    } else {
        scrollUp.classList.remove("show-scroll");
    }
}
window.addEventListener("scroll", scrollUp)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "uil-sun";

// Tema previamente selecionado (se selecionado pelo usuário)
// --- Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// Obtemos o tema atual que a interface possui validando a classe dark-theme
// --- We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? "uil-moon" : "uil-sun";

// Validamos se o usuário escolheu previamente um tema 
// --- We validate if the user previously chose a topic
if (selectedTheme) {
    // Se a validação for cumprida, verificamos o tema selecionado para ativarmos ou desativarmos o dark
    // --- If the validation is fulfilled, we check the selected theme to enable or disable dark
    document.body.classList[selectedTheme === "dark" ? "add" : "remove"](darkTheme);
    themeButton.classList[selectedIcon === "uil-moon" ? "add" : "remove"](iconTheme);
}
// Ative/desative o tema manualmente com o botão
// --- Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    // Salvamos o tema e o ícone atual que o usuário escolheu
    // --- We save the theme and the current icon that the user chose
    localStorage.setItem("selected-theme", getCurrentTheme());
    localStorage.setItem("selected-icon", getCurrentIcon());
})

/*==================== EMAIL JS ====================*/ 
const contactForm = document.getElementById("contact-form"),
      contactName = document.getElementById("contact-name"),
      contactEmail = document.getElementById("contact-email"),
      contactProject = document.getElementById("contact-project"),
      contactMessage = document.getElementById("contact-message"),
      contactAlert = document.getElementById("contact-alert");

const sendEmail = (e) => {
    e.preventDefault();

    // Check if the field has a value
    if (contactName.value === '' || contactEmail.value === '' ||
        contactProject.value === '' || contactMessage.value === '') {
        // Add and remove color
        contactAlert.classList.add("color-red");

        // Show message
        contactAlert.textContent = 'Preencha todos os campos!'
    } else {
        // serviceID - templateID - #form - publicKey
        emailjs.sendForm("service_54ie2m9", "template_me50jns", "#contact-form", "lEWHfzLLNJp9-7HFR")
            .then(() => {
                // Show message and add color
                contactAlert.classList.add("color-green");
                contactAlert.textContent = "Mensagem enviada!";

                // Remove message after five seconds
                setTimeout(() => {
                    contactAlert.textContent = "";
                }, 5000);
            }, (error) => {
                alert('OPA! ALGO FALHOU...'), error;
            });
        // Clearning inputs fields
        contactName.value = "";
        contactEmail.value = "";
        contactProject.value = "";
        contactMessage.value = "";
    };
};

contactForm.addEventListener("submit", sendEmail);

/*==================== SCROLL REVEAL ====================*/ 
const sr = ScrollReveal({
    origin: "right",
    distance: "60px",
    duration: 2000,
    delay: 100,
    // reset: true
})

sr.reveal(`.home__img`, {distance: "50px"});
sr.reveal(`.home__social, .home__data`, {origin: "top", interval: 100});
sr.reveal(`.home__scroll, .about__img, .about__data`, {origin: "bottom", interval: 100});
sr.reveal(`.section__title, .section__subtitle, .footer__container, .portfolio__container`, {origin: "bottom", delay: 0});
sr.reveal(`.about__data`, {origin: "bottom"});
sr.reveal(`.skills__box:nth-child(1), .contact__information`, {origin: "left"});
sr.reveal(`.skills__box:nth-child(2), .contact__form`, {origin: "right", distance: "22px"});
sr.reveal(`.qualification__container, .project__container`, {delay: 0, origin: "top"})