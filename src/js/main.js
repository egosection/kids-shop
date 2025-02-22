/////////////////////////////////////// Mobile Navigation ////////////////////////////////////////////
const hamburgerBtn = document.querySelector('#hamburger');
const hamburgerSvg = document.querySelector('#hamburger svg');
const hamburgerCloseBtn = document.querySelector('#hamburger-close');
const hamburgerCloseSvg = document.querySelector('#hamburger-close svg');
const navMenu = document.querySelector('#menu-holder');
const overlay = document.querySelector('#overlay');

const toggleMobileMenu = () => {
    navMenu.classList.toggle('right-[0]');
    hamburgerBtn.classList.toggle('hidden'); 
    hamburgerCloseBtn.classList.toggle('hidden'); 
    overlay.classList.toggle('hidden');
};

//Add disabled attribute to html to prevend bug when we click to fast during transition
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
    toggleMobileMenu();
    disableButtons();
});

hamburgerCloseBtn.addEventListener('click', () => {
    hamburgerSvg.classList.add('scale');
    toggleMobileMenu();
    disableButtons();
});

overlay.addEventListener('click', () => {
    hamburgerSvg.classList.add('scale');
    toggleMobileMenu();
    disableButtons();
});