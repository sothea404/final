// Sample product data
const products = [
    { 
        id: 1, 
        name: "iPhone X", 
        price: 699.99, 
        category: "electronics", 
        image: "https://cdn.xtmobile.vn/vnt_upload/product/04_2021/thumbs/(600x600)_crop_ip_X_gray_800x800_2.jpg",
        description: "Latest model with advanced camera and long battery life.",
        featured: true
    },
    { 
        id: 2, 
        name: "Headphones Wireless", 
        price: 149.99, 
        category: "electronics", 
        image: "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/MQTP3?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=SUFReFd6NEVVOW50TTcxUzVyWlhHZ2tuVHYzMERCZURia3c5SzJFOTlPZ3oveDdpQVpwS0ltY2w2UW05aU90TzVtaW9peGdOaitwV1Nxb1VublZoTVE",
        description: "Premium sound quality with noise cancellation.",
        featured: true
    },
    { 
        id: 3, 
        name: "Men's T-Shirt", 
        price: 24.99, 
        category: "clothing", 
        image: "https://contents.mediadecathlon.com/p2631400/k$80d36c409fb355ed24291fed07d65841/men-t-shirt-travel-500-wool-forclaz-8862115.jpg?f=1920x0&format=auto",
        description: "Comfortable cotton t-shirt available in multiple colors."
    },
    { 
        id: 4, 
        name: "Women's Jeans", 
        price: 59.99, 
        category: "clothing", 
        image: "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1736527960-untitled-3-67815035563fa.jpg?crop=0.774xw:0.830xh;0.111xw,0.0871xh&resize=980:",
        description: "Classic fit denim jeans with stretch comfort."
    },
    { 
        id: 5, 
        name: "Coffee Maker", 
        price: 89.99, 
        category: "home", 
        image: "images/cafe.webp",
        description: "Programmable coffee machine with thermal carafe.",
        featured: true
    },
    { 
        id: 6, 
        name: "Bedding Set", 
        price: 79.99, 
        category: "home", 
        image: "images/bedding.jpg",
        description: "Soft microfiber sheets and pillowcases."
    },
    { 
        id: 7, 
        name: "Laptop Pro", 
        price: 1299.99, 
        category: "electronics", 
        image: "images/laptob.webp",
        description: "High-performance laptop for work and gaming.",
        featured: true
    },
    { 
        id: 8, 
        name: "Kitchen Mixer", 
        price: 249.99, 
        category: "home", 
        image: "images/61qfEw5vTIL._AC_UF894,1000_QL80_.jpg",
        description: "Powerful stand mixer for all your baking needs.",
        featured: true
    },
    { 
        id: 9, 
        name: "Smart Watch", 
        price: 199.99, 
        category: "electronics", 
        image: "images/smart-watch.jpg",
        description: "Track fitness, notifications and more on your wrist.",
        featured: true
    },
    { 
        id: 10, 
        name: "Wireless Earbuds", 
        price: 129.99, 
        category: "electronics", 
        image: "images/wieless earbuds.jpg",
        description: "True wireless earbuds with exceptional sound quality.",
        featured: true
    },
    { 
        id: 11, 
        name: "Designer Bag", 
        price: 349.99, 
        category: "clothing", 
        image: "images/bag.jpg",
        description: "Premium designer handbag with elegant styling.",
        featured: true
    },
    { 
        id: 12, 
        name: "Smart Home Hub", 
        price: 179.99, 
        category: "electronics", 
        image: "images/smart-home-hub.jpg",
        description: "Control all your smart home devices from one central hub.",
        featured: true
    }
];

// Cart functionality
let cart = [];
const cartBadge = document.getElementById('cartBadge');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartDrawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('overlay');
const cartBtn = document.getElementById('cartBtn');
const closeCartBtn = document.getElementById('closeCartBtn');
const clearCartBtn = document.getElementById('clearCartBtn');
const productsContainer = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortSelect = document.getElementById('sortSelect');
const filterBtns = document.querySelectorAll('[data-filter]');

// Initialize the products display
function displayProducts(productsToShow = products) {
    productsContainer.innerHTML = '';
    
    if (productsToShow.length === 0) {
        // Display a message when no products match the search
        productsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <h3>No products found</h3>
                <p>Try a different search term or browse our categories.</p>
            </div>
        `;
        return;
    }
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-6';
        productCard.innerHTML = `
            <div class="card product-card" data-id="${product.id}" data-category="${product.category}">
                <div class="product-img-container">
                    <img src="${product.image}" class="product-img" alt="${product.name}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="fw-bold">$${product.price.toFixed(2)}</span>
                        <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });

    // Add event listeners to the Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Check if product is already in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }
        
        updateCart();
        
        // Show notification
        showNotification(`${product.name} added to cart!`);
    }
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update quantity function
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCart();
        }
    }
}

// Update cart display
function updateCart() {
    // Update badge count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalItems;
    
    // Update cart items
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center my-4">Your cart is empty</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="d-flex">
                    <div class="flex-shrink-0">
                        <img src="${item.image}" alt="${item.name}" width="60" height="60">
                    </div>
                    <div class="flex-grow-1 ms-3">
                        <h6 class="mb-0">${item.name}</h6>
                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div>
                                <span class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</span>
                            </div>
                            <div class="d-flex align-items-center">
                                <button class="btn btn-sm btn-outline-secondary me-2 quantity-btn" data-id="${item.id}" data-action="decrease">-</button>
                                <span>${item.quantity}</span>
                                <button class="btn btn-sm btn-outline-secondary ms-2 quantity-btn" data-id="${item.id}" data-action="increase">+</button>
                                <button class="btn btn-sm btn-outline-danger ms-3 remove-btn" data-id="${item.id}">
                                    <i class="fas fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            cartItems.appendChild(cartItem);
        });
        
        // Add event listeners for quantity buttons and remove buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                const action = this.getAttribute('data-action');
                const item = cart.find(item => item.id === productId);
                
                if (item) {
                    if (action === 'increase') {
                        updateQuantity(productId, item.quantity + 1);
                    } else if (action === 'decrease') {
                        updateQuantity(productId, item.quantity - 1);
                    }
                }
            });
        });
        
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                removeFromCart(productId);
            });
        });
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Toggle cart drawer
function toggleCart() {
    cartDrawer.classList.toggle('show');
    overlay.classList.toggle('show');
    document.body.style.overflow = cartDrawer.classList.contains('show') ? 'hidden' : '';
}

// Clear cart
function clearCart() {
    cart = [];
    updateCart();
}

// Search functionality
function searchProducts() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (searchTerm === '') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    // Add search feedback at the top of the container
    productsContainer.innerHTML = '';
    
    // Display results count
    const resultsMessage = document.createElement('div');
    resultsMessage.className = 'col-12 search-results mb-4';
    resultsMessage.innerHTML = filteredProducts.length > 0 
        ? `<p class="mb-0">Found <strong>${filteredProducts.length}</strong> products matching "<span class="search-highlight">${searchTerm}</span>"</p>`
        : `<p class="mb-0">No products found matching "<span class="search-highlight">${searchTerm}</span>". Try a different search term.</p>`;
    productsContainer.appendChild(resultsMessage);
    
    // Display the filtered products
    if (filteredProducts.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'col-12 text-center py-5';
        noResults.innerHTML = `
            <h4 class="mb-3">No results found</h4>
            <p>Try searching for a different term or browse our categories below.</p>
            <div class="mt-4">
                <button class="btn btn-outline-primary me-2" onclick="filterProducts('electronics')">Electronics</button>
                <button class="btn btn-outline-primary me-2" onclick="filterProducts('clothing')">Clothing</button>
                <button class="btn btn-outline-primary" onclick="filterProducts('home')">Home</button>
            </div>
        `;
        productsContainer.appendChild(noResults);
    } else {
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'col-xl-3 col-lg-4 col-md-6 col-sm-6';
            productCard.innerHTML = `
                <div class="card product-card" data-id="${product.id}" data-category="${product.category}">
                    <div class="product-img-container">
                        <img src="${product.image}" class="product-img" alt="${product.name}">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fw-bold">${product.price.toFixed(2)}</span>
                            <button class="btn btn-primary btn-sm add-to-cart" data-id="${product.id}">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(productCard);
        });
        
        // Add event listeners to the Add to Cart buttons
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
    }
}

// Filter products by category
function filterProducts(category) {
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    if (category === 'all') {
        displayProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const sortValue = sortSelect.value;
    let sortedProducts = [...products];
    
    switch (sortValue) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            // Default sorting (by id)
            sortedProducts.sort((a, b) => a.id - b.id);
    }
    
    displayProducts(sortedProducts);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'toast align-items-center text-white bg-primary border-0 position-fixed bottom-0 end-0 m-3';
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    notification.setAttribute('aria-atomic', 'true');
    notification.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;
    document.body.appendChild(notification);
    
    const bsToast = new bootstrap.Toast(notification, {
        autohide: true,
        delay: 3000
    });
    bsToast.show();
    
    // Remove the toast element after it's hidden
    notification.addEventListener('hidden.bs.toast', function() {
        notification.remove();
    });
}

// Event listeners
cartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
overlay.addEventListener('click', toggleCart);
clearCartBtn.addEventListener('click', clearCart);

// Fix search functionality - ensure form doesn't submit and search works properly
searchBtn.addEventListener('click', function(e) {
    e.preventDefault();  // Prevent form submission
    searchProducts();
});

// Fix the form submission - prevent default behavior
document.querySelector('form.d-flex').addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent form submission
    searchProducts();
});

searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent form submission
        searchProducts();
    }
});

sortSelect.addEventListener('change', sortProducts);

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-filter');
        filterProducts(category);
    });
});

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }
    
    // Display products
    displayProducts();
    
    // Set 'All Products' as active by default
    document.querySelector('[data-filter="all"]').classList.add('active');
});

// Responsive behavior
window.addEventListener('resize', () => {
    if (window.innerWidth > 992 && cartDrawer.classList.contains('show')) {
        cartDrawer.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// Carousel functionality
        class ProductCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.prevBtn = document.getElementById('prevBtn');
                this.nextBtn = document.getElementById('nextBtn');
                this.dotsContainer = document.getElementById('carouselDots');
                this.currentIndex = 0;
                this.cardWidth = 280 + 16; // card width + gap
                this.visibleCards = this.getVisibleCards();
                this.maxIndex = Math.max(0, products.length - this.visibleCards);
                
                this.init();
            }

            getVisibleCards() {
                const containerWidth = document.querySelector('.carousel-wrapper').offsetWidth;
                return Math.floor(containerWidth / this.cardWidth);
            }

            init() {
                this.renderProducts();
                this.createDots();
                this.updateButtons();
                this.bindEvents();
                
                // Update on resize
                window.addEventListener('resize', () => {
                    this.visibleCards = this.getVisibleCards();
                    this.maxIndex = Math.max(0, products.length - this.visibleCards);
                    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                    this.updateCarousel();
                });
            }

            renderProducts() {
                const featuredProducts = products.filter(product => product.featured);
                
                featuredProducts.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'carousel-card';
                    card.innerHTML = `
                        <div class="card-img-container">
                            <img src="${product.image}" class="card-img" alt="${product.name}" onerror="this.src='https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop'">
                            ${product.featured ? '<div class="featured-badge">Featured</div>' : ''}
                        </div>
                        <div class="card-content">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-description">${product.description}</p>
                            <div class="card-price">$${product.price.toFixed(2)}</div>
                            <button class="btn btn-primary-1" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus me-2"></i>Add to Cart
                            </button>
                        </div>
                    `;
                    this.track.appendChild(card);
                });
            }

            createDots() {
                const dotCount = Math.ceil(products.filter(p => p.featured).length / this.visibleCards);
                
                for (let i = 0; i < dotCount; i++) {
                    const dot = document.createElement('div');
                    dot.className = 'dot';
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => this.goToSlide(i));
                    this.dotsContainer.appendChild(dot);
                }
            }

            updateCarousel() {
                const translateX = -this.currentIndex * this.cardWidth;
                this.track.style.transform = `translateX(${translateX}px)`;
                this.updateButtons();
                this.updateDots();
            }

            updateButtons() {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
            }

            updateDots() {
                const dots = this.dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === Math.floor(this.currentIndex / this.visibleCards));
                });
            }

            prev() {
                if (this.currentIndex > 0) {
                    this.currentIndex--;
                    this.updateCarousel();
                }
            }

            next() {
                if (this.currentIndex < this.maxIndex) {
                    this.currentIndex++;
                    this.updateCarousel();
                }
            }

            goToSlide(slideIndex) {
                this.currentIndex = slideIndex * this.visibleCards;
                this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
                this.updateCarousel();
            }

            bindEvents() {
                this.prevBtn.addEventListener('click', () => this.prev());
                this.nextBtn.addEventListener('click', () => this.next());

                // Touch/swipe support
                let startX = 0;
                let currentX = 0;
                let isDragging = false;

                this.track.addEventListener('touchstart', (e) => {
                    startX = e.touches[0].clientX;
                    isDragging = true;
                });

                this.track.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    currentX = e.touches[0].clientX;
                });

                this.track.addEventListener('touchend', () => {
                    if (!isDragging) return;
                    isDragging = false;
                    
                    const diff = startX - currentX;
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) {
                            this.next();
                        } else {
                            this.prev();
                        }
                    }
                });

                // Keyboard navigation
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'ArrowLeft') this.prev();
                    if (e.key === 'ArrowRight') this.next();
                });
            }
        }

        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new ProductCarousel();
        });