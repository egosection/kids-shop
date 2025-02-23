/////////////////////////////////////// Mobile Navigation ////////////////////////////////////////////
const hamburgerBtn = document.querySelector('#hamburger');
const hamburgerSvg = document.querySelector('#hamburger svg');
const hamburgerCloseBtn = document.querySelector('#hamburger-close');
const hamburgerCloseSvg = document.querySelector('#hamburger-close svg');
const navMenu = document.querySelector('#menu-holder');
const navLinks = document.querySelectorAll('#menu-holder ul li a');
const overlay = document.querySelector('#overlay');

const openMobileMenu = () => {
    navMenu.classList.add('right-[0]');
    hamburgerBtn.classList.add('hidden');
    hamburgerCloseBtn.classList.remove('hidden');
    overlay.classList.remove('hidden');
    toggleOverlayAria();
};

const closeMobileMenu = () => {
    navMenu.classList.remove('right-[0]');
    hamburgerBtn.classList.remove('hidden');
    hamburgerCloseBtn.classList.add('hidden');
    overlay.classList.add('hidden');
    toggleOverlayAria();
};

const toggleOverlayAria = () => {
    let overlayAriaHidden = overlay.getAttribute("aria-hidden");
    overlayAriaHidden === 'true' ? overlay.setAttribute('aria-hidden', 'false') : overlay.setAttribute('aria-hidden', 'true');
};

//Add disabled attribute to html to prevend bug when we click too fast during transition
const disableButtons = () => {
    hamburgerBtn.disabled = true;
    hamburgerCloseBtn.disabled = true;
    setTimeout(() => {
        hamburgerBtn.disabled = false;
        hamburgerCloseBtn.disabled = false;
    }, 100);
};

hamburgerBtn.addEventListener('click', () => {
    hamburgerCloseSvg.classList.add('rotate180');
    openMobileMenu();
    disableButtons();
});

hamburgerCloseBtn.addEventListener('click', () => {
    hamburgerSvg.classList.add('scale');
    closeMobileMenu();
    disableButtons();
});

overlay.addEventListener('click', () => {
    hamburgerSvg.classList.add('scale');
    closeMobileMenu();
    disableButtons();
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburgerSvg.classList.add('scale');
        navMenu.classList.remove('right-[0]');
        hamburgerBtn.classList.remove('hidden');
        hamburgerCloseBtn.classList.add('hidden');
        overlay.classList.add('hidden');
    })
})
