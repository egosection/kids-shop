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

function toggleClass(element, className, add) {
    element.classList[add ? 'add' : 'remove'](className);
}

function openMobileMenu() {
    toggleClass(navMenu, 'right-[0]', true);
    toggleClass(hamburgerBtn, 'hidden', true);
    toggleClass(hamburgerCloseBtn, 'hidden', false);
    openOverlay();
}

function closeMobileMenu() {
    toggleClass(navMenu, 'right-[0]', false);
    toggleClass(hamburgerBtn, 'hidden', false);
    toggleClass(hamburgerCloseBtn, 'hidden', true);
    closeOverlay();
    toggleClass(hamburgerSvg, 'scale', true);
}

function openOverlay() {
    overlay.setAttribute('aria-hidden', 'false');
    toggleClass(overlay, 'hidden', false);
}

function closeOverlay() {
    overlay.setAttribute('aria-hidden', 'true');
    toggleClass(overlay, 'hidden', true);
}

function disableButtons() {
    hamburgerBtn.disabled = true;
    hamburgerCloseBtn.disabled = true;
    setTimeout(() => {
        hamburgerBtn.disabled = false;
        hamburgerCloseBtn.disabled = false;
    }, 100);
}

function disableSearchButtons() {
    toggleClass(searchBtn, 'cursor-none', true);
    setTimeout(() => {
        toggleClass(searchBtn, 'cursor-pointer', true);
    }, 200);
}

function openSearch() {
    toggleClass(searchWrap, 'top-[-100%]', false);
    toggleClass(searchWrap, 'top-[20%]', true);
}

function closeSearch() {
    toggleClass(searchWrap, 'top-[20%]', false);
    toggleClass(searchWrap, 'top-[-100%]', true);
}

function toggleSearch() {
    closeMobileMenu();
    searchWrap.classList.toggle('top-[20%]');
}

hamburgerBtn.addEventListener('click', () => {
    closeSearch();
    toggleClass(hamburgerCloseSvg, 'rotate180', true);
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
        toggleClass(hamburgerSvg, 'scale', true);
        closeMobileMenu();
    });
});

searchBtn.addEventListener('click', () => {
    if (searchWrap.classList.contains('top-[-100%]')) {
        openSearch();
        closeMobileMenu();
    } else {
        closeSearch();
    }
});
