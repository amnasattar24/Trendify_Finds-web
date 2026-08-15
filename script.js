// PAGES METADATA
const PAGES = [
  {
    id: 'fashion',
    name: 'Fashion & Lifestyle',
    tagline: 'Style for everyone',
    heroTitle: 'Elevate your everyday',
    heroHighlight: 'style',
    heroDescription: 'From everyday essentials to statement pieces — discover top-rated picks across fashion, beauty, and home decor.',
    categories: ['All', 'Women Undergarments', 'Women Makeup', 'Skin Care', 'Women Dresses', 'Men Dresses', 'Hair Products', 'Home Decoration']
  },
  {
    id: 'tech',
    name: 'Tech Products',
    tagline: 'Smart living, simplified',
    heroTitle: 'The latest tech',
    heroHighlight: 'worth buying',
    heroDescription: 'Handpicked gadgets, kitchen tech, and accessories that make everyday life smoother and smarter.',
    categories: ['All', 'Tech Gadgets', 'Kitchen Accessories', 'Room Accessories', 'Tech Tools', 'Mobile & Desktop', 'Speakers', 'Bluetooth Devices']
  },
  {
    id: 'gaming',
    name: 'Gaming Products',
    tagline: 'Level up your setup',
    heroTitle: 'Build your dream',
    heroHighlight: 'gaming setup',
    heroDescription: 'Everything from pro-grade peripherals to ambient lighting — curated for gamers who want the best.',
    categories: ['All', 'Mouse', 'Storage', 'Laptop', 'Xbox Accessories', 'Desk Pads', 'PC Accessories', 'Chair', 'Monitors', 'Merchandise', 'Collectables', 'Room Light', 'Router', 'Switch Accessories']
  },
  {
    id: 'fitness',
    name: 'Fitness Products',
    tagline: 'Train harder, recover smarter',
    heroTitle: 'Gear that moves',
    heroHighlight: 'with you',
    heroDescription: 'Weights, wearables, supplements, and outdoor gear — everything you need to hit your goals.',
    categories: ['All', 'Weights', 'Travel', 'Machines', 'Compact', 'Supplements', 'Tracking Device', 'Outdoor', 'Accessories', 'Flexible Training', 'Water Bottles', 'Strength', 'Home Workout', 'CrossFit', 'Wearable', 'Equipment']
  }
];

// SAMPLE PRODUCTS
const PRODUCTS = [
  {
    id: 'f1',
    page: 'fashion',
    title: 'Korean Style Aesthetic Ambient Desk Lamp',
    description: 'Minimalist warm light lamp perfect for cozy bedroom and study table vibes.',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=400',
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.8,
    reviews: 182,
    category: 'Home Decoration',
    affiliateLink: 'https://amazon.com',
    featured: true
  },
  {
    id: 'f2',
    page: 'fashion',
    title: 'Hydrating Glow Facial Serum',
    description: 'Deeply moisturizing skin serum for radiant, glass-skin texture daily.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    price: 18.50,
    originalPrice: 28.00,
    rating: 4.9,
    reviews: 420,
    category: 'Skin Care',
    affiliateLink: 'https://amazon.com',
    featured: true
  },
  {
    id: 't1',
    page: 'tech',
    title: 'Wireless Active Noise Cancelling Earbuds Pro',
    description: 'Immersive sound quality, ultra-long battery life, and comfortable ergonomic fit.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=400',
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 530,
    category: 'Bluetooth Devices',
    affiliateLink: 'https://amazon.com',
    featured: true
  },
  {
    id: 'g1',
    page: 'gaming',
    title: 'RGB Ultra-Lightweight Wireless Gaming Mouse',
    description: 'High-precision sensor with customizable DPI settings and stunning RGB lighting.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400',
    price: 34.99,
    originalPrice: 59.99,
    rating: 4.8,
    reviews: 310,
    category: 'Mouse',
    affiliateLink: 'https://amazon.com',
    featured: true
  },
  {
    id: 'ft1',
    page: 'fitness',
    title: 'Smart Fitness Tracker Watch with HR Monitor',
    description: 'Track daily steps, calories burned, sleep cycles, and outdoor workouts.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&q=80&w=400',
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.8,
    reviews: 640,
    category: 'Tracking Device',
    affiliateLink: 'https://amazon.com',
    featured: true
  }
];

let currentPageId = 'fashion';
let currentCategory = 'All';
let searchQuery = '';

const heroTitleEl = document.getElementById('heroTitle');
const heroDescriptionEl = document.getElementById('heroDescription');
const heroTaglineEl = document.getElementById('heroTagline');
const categoryPillsEl = document.getElementById('categoryPills');
const productGridEl = document.getElementById('productGrid');
const productsCountEl = document.getElementById('productsCount');
const searchInputEl = document.getElementById('searchInput');
const noResultsEl = document.getElementById('noResults');
const navBtns = document.querySelectorAll('.nav-btn');

function init() {
  setupEventListeners();
  renderPage(currentPageId);
}

function setupEventListeners() {
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPageId = btn.getAttribute('data-page');
      currentCategory = 'All';
      searchQuery = '';
      searchInputEl.value = '';
      renderPage(currentPageId);
    });
  });

  searchInputEl.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderProducts();
  });
}

function renderPage(pageId) {
  const pageData = PAGES.find(p => p.id === pageId);
  if (!pageData) return;

  heroTaglineEl.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${pageData.tagline}`;
  heroTitleEl.innerHTML = `${pageData.heroTitle} <span class="highlight">${pageData.heroHighlight}</span>`;
  heroDescriptionEl.textContent = pageData.heroDescription;

  renderCategories(pageData.categories);
  renderProducts();
}

function renderCategories(categories) {
  categoryPillsEl.innerHTML = '';
  categories.forEach(cat => {
    const pill = document.createElement('button');
    pill.className = `category-pill ${cat === currentCategory ? 'active' : ''}`;
    pill.textContent = cat;
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = cat;
      renderProducts();
    });
    categoryPillsEl.appendChild(pill);
  });
}

function renderProducts() {
  const filtered = PRODUCTS.filter(p => {
    const matchesPage = p.page === currentPageId;
    const matchesCategory = currentCategory === 'All' || p.category === currentCategory;
    const matchesSearch = searchQuery === '' || 
      p.title.toLowerCase().includes(searchQuery) || 
      p.description.toLowerCase().includes(searchQuery) ||
      p.category.toLowerCase().includes(searchQuery);

    return matchesPage && matchesCategory && matchesSearch;
  });

  productsCountEl.textContent = `Showing ${filtered.length} products`;

  if (filtered.length === 0) {
    productGridEl.innerHTML = '';
    noResultsEl.classList.remove('hidden');
    return;
  }

  noResultsEl.classList.add('hidden');
  
  productGridEl.innerHTML = filtered.map(product => `
    <div class="product-card">
      <div class="card-image-wrap">
        <img src="${product.image}" alt="${product.title}" class="card-image" loading="lazy">
        ${product.featured ? '<span class="badge-featured">Featured</span>' : ''}
      </div>
      <div class="card-body">
        <span class="card-category">${product.category}</span>
        <h3 class="card-title">${product.title}</h3>
        <p class="card-description">${product.description}</p>
        
        <div class="card-rating">
          <span class="stars"><i class="fa-solid fa-star"></i> ${product.rating}</span>
          <span class="reviews-count">(${product.reviews} reviews)</span>
        </div>

        <div class="card-footer">
          <div class="price-box">
            <span class="current-price">$${product.price.toFixed(2)}</span>
            ${product.originalPrice ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>` : ''}
          </div>
          <a href="${product.affiliateLink}" target="_blank" rel="noopener noreferrer" class="cta-button">
            Check on Amazon <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', init);