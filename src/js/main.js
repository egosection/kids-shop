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
const cartBtn = document.querySelector('.cart-btn');
const cartWrap = document.querySelector('.cart-wrap');

function toggleClass(element, className, add) {
    element.classList[add ? 'add' : 'remove'](className);
}

function openMobileMenu() {
    toggleClass(navMenu, 'right-[0]', true);
    toggleClass(hamburgerBtn, 'hidden', true);
    toggleClass(hamburgerCloseBtn, 'hidden', false);
    openOverlay();
    closeCart();
    closeSearch();
}

function closeMobileMenu() {
    toggleClass(navMenu, 'right-[0]', false);
    toggleClass(hamburgerBtn, 'hidden', false);
    toggleClass(hamburgerCloseBtn, 'hidden', true);
    closeOverlay();
    toggleClass(hamburgerSvg, 'scale', true);
}

function openCart() {
    toggleClass(cartWrap, 'left-[-100%]', false);
    toggleClass(cartWrap, 'left-[0]', true);
    closeOverlay();
    closeMobileMenu();
    closeSearch();
}

function closeCart() {
    toggleClass(cartWrap, 'left-[0]', false);
    toggleClass(cartWrap, 'left-[-100%]', true);
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
    closeOverlay();
    closeMobileMenu();
    closeCart();
}

function closeSearch() {
    toggleClass(searchWrap, 'top-[20%]', false);
    toggleClass(searchWrap, 'top-[-100%]', true);
}

function toggleSearch() {
    closeMobileMenu();
    searchWrap.classList.toggle('top-[20%]');
}

function hideTopBar() {
    const topBar = document.querySelector('.top-bar');
    if (topBar) {
        if (document.documentElement.scrollTop < 1) {
            topBar.classList.remove("top-sticky");
        } else {
            topBar.classList.add("top-sticky");
        }
    }
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
    } else {
        closeSearch();
    }
});

document.addEventListener('click', (event) => {
    if (!searchWrap.contains(event.target) && !searchBtn.contains(event.target)) {
        closeSearch();
    }
    if (!cartWrap.contains(event.target) && !cartBtn.contains(event.target)) {
        closeCart();
    }
});

cartBtn.addEventListener('click', () => {
    if (cartWrap.classList.contains('left-[-100%]')) {
        openCart();
        closeMobileMenu();
    } else {
        closeCart();
    }
});

window.addEventListener("scroll", hideTopBar);
