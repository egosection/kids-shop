/////////////////////////////////////// Mobile Navigation ////////////////////////////////////////////
const hamburgerBtn = document.querySelector('#hamburger');
const hamburgerSvg = document.querySelector('#hamburger svg');
const hamburgerCloseBtn = document.querySelector('#hamburger-close');
const hamburgerCloseSvg = document.querySelector('#hamburger-close svg');
const navMenu = document.querySelector('#menu-holder');
const navLinks = document.querySelectorAll('#menu-holder ul li a');
const overlay = document.querySelector('#overlay');
const searchBtn = document.querySelector('.search-btn');
const searchWrap = document.querySelector('.search-wrap');

function openMobileMenu() {
    navMenu.classList.add('right-[0]');
    hamburgerBtn.classList.add('hidden');
    hamburgerCloseBtn.classList.remove('hidden');
    openOverlay();
};

function closeMobileMenu() {
    navMenu.classList.remove('right-[0]');
    hamburgerBtn.classList.remove('hidden');
    hamburgerCloseBtn.classList.add('hidden');
    closeOverlay();
    hamburgerSvg.classList.add('scale');
};

function openOverlay() {
    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.remove('hidden');
}

function closeOverlay() {
    overlay.setAttribute('aria-hidden', 'true');
    overlay.classList.add('hidden');
}

//Add disabled attribute to html to prevend bug when we click too fast during transition
function disableButtons() {
    hamburgerBtn.disabled = true;
    hamburgerCloseBtn.disabled = true;
    setTimeout(() => {
        hamburgerBtn.disabled = false;
        hamburgerCloseBtn.disabled = false;
    }, 100);
};

function disableSearchButtons() {
    searchBtn.classList.add('cursor-none');
    setTimeout(() => {
        searchBtn.classList.add('cursor-pointer');
    }, 200);
};

function openSearch() {
    searchWrap.classList.remove('top-[-100%]');
    searchWrap.classList.add('top-[20%]');
}

function closeSearch() {
    searchWrap.classList.remove('top-[20%]');
    searchWrap.classList.add('top-[-100%]');
}

function toggleSearch() {
    closeMobileMenu();
    searchWrap.classList.toggle('top-[20%]'); 
}


hamburgerBtn.addEventListener('click', () => {
    closeSearch();
    hamburgerCloseSvg.classList.add('rotate180');
    openMobileMenu();
    disableButtons();
});

hamburgerCloseBtn.addEventListener('click', () => {
    closeMobileMenu();
    disableButtons();
});

overlay.addEventListener('click', () => {
    closeMobileMenu();
    closeOverlay();
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        hamburgerSvg.classList.add('scale');
        navMenu.classList.remove('right-[0]');
        hamburgerBtn.classList.remove('hidden');
        hamburgerCloseBtn.classList.add('hidden');
        overlay.classList.add('hidden');
    })
});

searchBtn.addEventListener('click', () => {
    if(searchWrap.classList.contains('top-[-100%]')) {
        searchWrap.classList.remove('top-[-100%]');
        searchWrap.classList.add('top-[20%]');
        closeMobileMenu(); 
    } else {
        searchWrap.classList.remove('top-[20%]');
        searchWrap.classList.add('top-[-100%]');
    } 
});
