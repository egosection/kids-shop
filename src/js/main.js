/////////////////////////////////////// HEADER ////////////////////////////////////////////
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
        if (document.documentElement.scrollTop < 50) {
            toggleClass(topBar, 'top-sticky', false);
        } else {
            toggleClass(topBar, 'top-sticky', true);
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


/////////////////////////////////////// PRODUCTS ////////////////////////////////////////////

async function getProducts() {
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        showProducts(data);
    } catch(err) {
        console.error(err);
    }
}

function showProducts(arr) {
    const productDiv = document.querySelector('#toys');
    const productHTML = arr.map(product => {
        const discountBadge = product.discountedPrice !== null ? `<span class="disc-badge">-${calculateDiscount(product.regularPrice, product.discountedPrice)}% Promo</span>` : '';
        const priceHTML = product.discountedPrice !== null ? `<div class="price"><span>$${product.regularPrice}</span>$${product.discountedPrice}</div>` : `<div class="price">$${product.regularPrice}</div>`;
        
        return `
            <div class="product-box">
                <div class="product">
                    ${discountBadge}
                    <a href="#" title="${product.title}">
                        <img src="${product.image}" height="472" width="360" alt="${product.title}">
                    </a>
                    <div class="product-desc">
                        <a href="#" title="${product.title}">
                            <h3>${product.title}</h3>
                        </a>
                        ${priceHTML}
                        <button class="add-cart" aria-label="Add to the cart">
                            <svg class="add-to-cart" viewBox="0 0 24 24" fill="#fff" width="24" height="24">
                                <path d="M4.005 16V4h-2V2h3a1 1 0 0 1 1 1v12h12.438l2-8H8.005V5h13.72a1 1 0 0 1 .97 1.243l-2.5 10a1 1 0 0 1-.97.757H5.004a1 1 0 0 1-1-1m2 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4m12 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    productDiv.innerHTML = productHTML;
}

function calculateDiscount(regPrice , disPrice) {
    const discount = ((regPrice - disPrice) / regPrice) * 100;
    return discount.toFixed(0);
}

getProducts();


/////////////////////////////////////// FAQ ////////////////////////////////////////////
document.querySelectorAll('.accordion').forEach(acc => {
    acc.addEventListener('click', function() {
        document.querySelectorAll('.accordion').forEach(otherAcc => {
            if (otherAcc !== acc) {
                otherAcc.classList.remove('active');
                otherAcc.nextElementSibling.style.maxHeight = null;
            }
        });
        this.classList.toggle('active');
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
    });
});
