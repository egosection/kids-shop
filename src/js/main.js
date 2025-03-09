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
const cartShopBtn = document.querySelector('.shopBtn');
const productsArr = [];
const searchItems = document.querySelectorAll('.s-item');
const cart = [];

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

cartShopBtn.addEventListener('click', closeCart);

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
    if (!cartWrap.contains(event.target) && !cartBtn.contains(event.target) && !event.target.closest('.add-cart') && !event.target.closest('.quantity button') && !event.target.closest('.q-p button')) {
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


/////////////////////////////////////// PRODUCTS & ADD TO CART ////////////////////////////////////////////

async function getProducts() {
    try {
        const response = await fetch('/products.json');
        const data = await response.json();
        productsArr.push(data);
        showProducts(data);
        showSearchItems(productsArr);

        document.querySelectorAll('.add-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productBox = e.target.closest('.product-box');
                const productId = productBox.id;
                const productTitle = productBox.querySelector('h3').textContent;
                const productImage = productBox.querySelector('img').src;
                const productPrice = productBox.querySelector('.reg-p') ? productBox.querySelector('.dis-p').textContent.trim() : productBox.querySelector('.price').textContent.trim();

                const existingProduct = cart.find(item => item.id === productId);

                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.push({
                        id: productId,
                        title: productTitle,
                        image: productImage,
                        price: productPrice,
                        quantity: 1
                    });
                }
                
                renderCartItems();
                checkCartIcon()

            });
        });

    } catch (err) {
        console.error(err);
    }
}

function checkCartIcon() {
    const cartNumber = document.querySelector('.c-number');
    if (cartNumber) {
        cartNumber.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        cartNumber.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

function showProducts(arr) {
    const productDiv = document.querySelector('#toys');
    const productHTML = arr.map(product => {
        const discountBadge = product.discountedPrice !== null ? `<span class="disc-badge">-${calculateDiscount(product.regularPrice, product.discountedPrice)}% Promo</span>` : '';
        const priceHTML = product.discountedPrice !== null ? `<div class="price"><span class="reg-p">$${product.regularPrice}</span><p class="dis-p">$${product.discountedPrice}</p></div>` : `<div class="price">$${product.regularPrice}</div>`;

        return `
            <div class="product-box" id="${product.id}">
                <div class="product">
                    ${discountBadge}
                    <a href="#" title="${product.title}">
                        <img src="${product.image}" height="472" width="360" alt="${product.title}" loading="lazy">
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

function calculateDiscount(regPrice, disPrice) {
    return (((regPrice - disPrice) / regPrice) * 100).toFixed(0);
}

function renderCartItems() {
    const cartItemsDiv = document.querySelector('.cart-wrap');
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `
            <div class="flex flex-col items-center gap-2">
                <h3 class="text-xl uppercase font-bold text-white">My Cart</h3>
                <svg viewBox="0 0 128 128" fill="#fff" width="128" height="128"><path d="M21.36 85.333V21.333h-10.667V10.667h16a5.333 5.333 0 0 1 5.333 5.333v64h66.336l10.667 -42.667H42.693V26.667h73.173a5.333 5.333 0 0 1 5.173 6.629l-13.333 53.333a5.333 5.333 0 0 1 -5.173 4.037H26.688a5.333 5.333 0 0 1 -5.333 -5.333m10.667 37.333a10.667 10.667 0 1 1 0 -21.333 10.667 10.667 0 0 1 0 21.333m64 0a10.667 10.667 0 1 1 0 -21.333 10.667 10.667 0 0 1 0 21.333"/></svg>
                <div class="flex gap-2 items-center">
                    <span class="text-white text-lg">Your cart is empty</span>
                    <svg viewBox="0 0 32 32" width="32" height="32" fill="#fff"><path d="M10.597 19.279a1.27 1.27 0 0 1-1.271 1.271 1.27 1.27 0 0 1-1.271-1.271 1.271 1.271 0 0 1 2.541 0m13.347 0a1.27 1.27 0 0 1-1.271 1.271 1.27 1.27 0 0 1-1.271-1.271 1.271 1.271 0 0 1 2.541 0"/><path d="M32 18.739a3.75 3.75 0 0 0-3.085-3.688v-.556C28.915 7.374 23.122 1.58 16 1.58S3.085 7.375 3.085 14.496v.556A3.75 3.75 0 0 0 0 18.739a3.75 3.75 0 0 0 3.131 3.696c.249 2.845 1.552 4.947 3.881 6.255 2.072 1.163 5.012 1.728 8.988 1.728s6.916-.565 8.988-1.728c2.329-1.308 3.632-3.409 3.881-6.255A3.75 3.75 0 0 0 32 18.739m-30.677 0c0-1.108.747-2.043 1.763-2.332v4.664a2.43 2.43 0 0 1-1.763-2.332m26.268 2.655c0 2.905-1.064 4.915-3.251 6.143-1.869 1.049-4.597 1.559-8.34 1.559s-6.472-.509-8.34-1.559c-2.188-1.228-3.251-3.237-3.251-6.143v-6.897c0-5.235 3.488-9.668 8.261-11.103 3.636.045 5.573 2.671 5.573 4.572a2.643 2.643 0 0 1-2.64 2.64 1.98 1.98 0 0 1-1.98-1.98c0-.8.651-1.452 1.452-1.452a.661.661 0 0 0 0-1.323A2.777 2.777 0 0 0 12.3 8.626a3.307 3.307 0 0 0 3.303 3.303 3.967 3.967 0 0 0 3.963-3.963c0-1.373-.689-2.849-1.845-3.951a6.7 6.7 0 0 0-1.561-1.107c6.319.085 11.432 5.251 11.432 11.589zm1.323-.323v-4.664c1.016.289 1.763 1.224 1.763 2.332s-.747 2.043-1.763 2.332"/><path d="M12.507 24.319a.66.66 0 0 0 0 .936.66.66 0 0 0 .936 0 3.62 3.62 0 0 1 5.116 0 .66.66 0 0 0 .936 0 .66.66 0 0 0 0-.936 4.947 4.947 0 0 0-6.987 0m-2.709-9.693a.661.661 0 0 0-1.323 0 1.26 1.26 0 0 1-1.259 1.259.661.661 0 0 0 0 1.323 2.587 2.587 0 0 0 2.581-2.581m13.725 0a.661.661 0 0 0-1.323 0 2.583 2.583 0 0 0 2.581 2.581.661.661 0 0 0 0-1.323 1.26 1.26 0 0 1-1.259-1.259"/></svg>
                </div>
                <a class="shopBtn btn" href="#products" title="Go to products">Shop Now</a>
            </div>
        `;

       checkCartIcon()

        return;
    }

    const cartHTML = cart.map(item => `
        <div class="cart-products grid grid-cols-6 grid-rows-2 w-full gap-2 p-2 bg-[#59516c]">
            <img class="col-span-1 row-span-2 w-full rounded-lg" src="${item.image}" width="32" height="32" alt="${item.title}">
            <h6 class="col-span-5 row-span-1 flex items-end text-white">${item.title}</h6>
            <div class="q-p col-span-5 flex justify-between items-start">
                <div class="quantity flex items-center gap-x-2">
                    <button class="flex justify-center items-center w-[24px] h-[24px] bg-primary text-white rounded-full p-2 cursor-pointer" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <input class="bg-[#6a6080] text-white w-[40px] text-center rounded-lg" type="number" name="quantity" value="${item.quantity}" readonly>
                    <button class="flex justify-center items-center w-[24px] h-[24px] bg-primary text-white rounded-full p-2 cursor-pointer" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <div class="price mr-2 font-medium text-[#d0ea74]">${item.price}</div>
                <button class="remove-cart-item" aria-label="Remove from cart" data-id="${item.id}">
                <svg width="24" height="24" viewBox="0 0 0.72 0.72" xmlns="http://www.w3.org/2000/svg" fill="#ff3fa2"><path d="M.6.18H.48V.15A.09.09 0 0 0 .39.06H.33a.09.09 0 0 0-.09.09v.03H.12a.03.03 0 0 0 0 .06h.03v.33a.09.09 0 0 0 .09.09h.24A.09.09 0 0 0 .57.57V.24H.6a.03.03 0 0 0 0-.06M.3.15A.03.03 0 0 1 .33.12h.06a.03.03 0 0 1 .03.03v.03H.3Zm.21.42A.03.03 0 0 1 .48.6H.24A.03.03 0 0 1 .21.57V.24h.3Z"/></svg>
                </button>
            </div>
        </div>
    `).join('');

    cartItemsDiv.innerHTML = `
        <h3 class="text-xl uppercase font-bold text-white ml-2 mb-4">My Cart</h3>
        ${cartHTML}
    `;

    document.querySelectorAll('.remove-cart-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.closest('.remove-cart-item').dataset.id;
            removeCartItem(productId);
        });
    });
}

function updateQuantity(productId, change) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += change;
        if (product.quantity <= 0) {
            removeCartItem(productId);
        } else {
            renderCartItems();
        }
    }
}

function removeCartItem(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        renderCartItems();
    }
}

function showSearchItems(arr) {
    const searchResultsDiv = document.querySelector('.search-items');
    const searchForm = document.querySelector('.search-form');
    let searchHTML = '';

    arr[0].forEach(product => {
        searchHTML += `
        <a class="s-item flex items-center gap-4" href="${product.id}">
            <img class="rounded-full w-[40px] h-[40px] object-cover my-1" src="${product.image}" width="40" height="40" alt="${product.title}">
            <h6>${product.title}</h6>
        </a>
        `;
    });

    searchResultsDiv.innerHTML = searchHTML;

    searchForm.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = arr[0].filter(product => product.title.toLowerCase().includes(searchTerm));
        let filteredHTML = '';
        filteredProducts.forEach(product => {
            filteredHTML += `
            <a class="s-item flex items-center gap-4 bg-[#ffca79] hover:bg-[#ffd87b] duration-200 rounded-lg my-1 px-2" href="#${product.id}" onclick="closeSearch()">
                <img class="rounded-full w-[40px] h-[40px] object-cover my-1" src="${product.image}" width="40" height="40" alt="${product.title}">
                <h6 class="text-[#885339] font-bold">${product.title}</h6>
            </a>
            `;
        });
        searchResultsDiv.innerHTML = filteredHTML;
    });

    searchResultsDiv.innerHTML = '';

    document.querySelector('#submit').addEventListener('click', (e) => {
        e.preventDefault();
        if (searchResultsDiv.innerHTML === '') {
            searchResultsDiv.textContent = 'Nothing found :(';
        }
    });
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


/////////////////////////////////////// CONTACT US ////////////////////////////////////////////
document.querySelector('.r-side form').addEventListener('submit', (e) => {  
    const message = document.querySelector('.error-msg');
    e.preventDefault();
    const fullName = e.target.name.value.trim();
    const phoneNumber = e.target.phone.value.trim();
    const email = e.target.email.value.trim();
    const text = e.target.msg.value.trim();

    message.classList.remove('p-error', 'p-success');

    if(!fullName || !phoneNumber || !email || !text) {
        message.classList.add('p-error');
        message.textContent = 'All fields are required!';
        return;
    }

    if(fullName.length < 8 || phoneNumber.length < 8 || email.length < 8 || text.length < 8) {
        message.classList.add('p-error');
        message.textContent = 'Name, Phone, Email and Text fields must be at least 8 characters';
        return;
    }

    message.classList.remove('p-error');
    message.classList.add('p-success');
    message.textContent = 'Successfully sent!';
    e.target.name.value = '';
    e.target.phone.value = '';
    e.target.email.value = '';
    e.target.msg.value = '';
});
