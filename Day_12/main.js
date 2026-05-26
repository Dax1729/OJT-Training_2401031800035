// VintageVault — main.js

// =====================================================
// NAV: hamburger toggle
// =====================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
  });
}

// =====================================================
// TERMINAL ANIMATION (hero only)
// =====================================================
const terminalBody = document.getElementById('terminalBody');
if (terminalBody) {
  const lines = [
    { text: '$ ./vault_init.sh', cls: 't-amber' },
    { text: 'Authenticating archive...', cls: 't-muted' },
    { text: '✓ 200 items catalogued', cls: '' },
    { text: '✓ Provenance verified', cls: '' },
    { text: '✓ Condition grades assigned', cls: '' },
    { text: '', cls: '' },
    { text: '$ ls ./acquisitions/latest', cls: 't-amber' },
    { text: 'ibm_pc_5150_1981.json', cls: '' },
    { text: 'next_cube_1990.json', cls: '' },
    { text: 'dec_vt100_1978.json', cls: '' },
    { text: 'altair_8800_1975.json', cls: '' },
    { text: '', cls: '' },
    { text: '$ echo "Welcome to VintageVault"', cls: 't-amber' },
    { text: 'Welcome to VintageVault', cls: 't-cream cursor' },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentEl = null;

  function typeNext() {
    if (lineIndex >= lines.length) return;

    const line = lines[lineIndex];

    if (charIndex === 0) {
      currentEl = document.createElement('div');
      if (line.cls) {
        line.cls.split(' ').forEach(c => { if (c) currentEl.classList.add(c); });
      }
      terminalBody.appendChild(currentEl);
    }

    if (charIndex < line.text.length) {
      currentEl.textContent = line.text.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeNext, line.cls === 't-muted' ? 18 : 35);
    } else {
      lineIndex++;
      charIndex = 0;
      setTimeout(typeNext, line.text === '' ? 100 : 220);
    }
  }

  setTimeout(typeNext, 600);
}

// =====================================================
// NEWSLETTER
// =====================================================
function handleNewsletter(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  const original = btn.textContent;
  btn.textContent = '✓ Subscribed';
  btn.style.background = '#28C840';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
    btn.style.color = '';
    e.target.reset();
  }, 2500);
  return false;
}

// =====================================================
// CATALOG: filter + sort
// =====================================================
const catalogGrid = document.getElementById('catalogGrid');
if (catalogGrid) {
  let activeCat = 'all';
  let activeCond = 'all';
  let activeEra = 'all';
  let maxPrice = 10000;

  function updateCatalog() {
    const cards = catalogGrid.querySelectorAll('.catalog-card');
    let visible = 0;
    cards.forEach(card => {
      const cat = card.dataset.cat || '';
      const price = parseInt(card.dataset.price || '0');
      const era = card.dataset.era || '';

      const catOk = activeCat === 'all' || cat === activeCat;
      const priceOk = price <= maxPrice;
      const eraOk = activeEra === 'all' || era === activeEra;

      if (catOk && priceOk && eraOk) {
        card.style.display = '';
        visible++;
      } else {
        card.style.display = 'none';
      }
    });

    const countEl = document.querySelector('.catalog-count strong');
    if (countEl) countEl.textContent = visible;
  }

  // Category filter
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCat = btn.dataset.cat;
      updateCatalog();
    });
  });

  // Era filter
  document.querySelectorAll('[data-era]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-era]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeEra = btn.dataset.era;
      updateCatalog();
    });
  });

  // Price range
  const priceRange = document.getElementById('priceRange');
  const priceVal = document.getElementById('priceVal');
  if (priceRange) {
    priceRange.addEventListener('input', () => {
      maxPrice = parseInt(priceRange.value);
      priceVal.textContent = parseInt(maxPrice).toLocaleString();
      updateCatalog();
    });
  }

  // Sort
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      const cards = Array.from(catalogGrid.querySelectorAll('.catalog-card'));
      const val = sortSelect.value;
      cards.sort((a, b) => {
        const pa = parseInt(a.dataset.price || '0');
        const pb = parseInt(b.dataset.price || '0');
        if (val === 'price-asc') return pa - pb;
        if (val === 'price-desc') return pb - pa;
        return 0;
      });
      cards.forEach(c => catalogGrid.appendChild(c));
    });
  }
}

// =====================================================
// MODAL
// =====================================================
function openModal(title, price, year, cat, desc) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalPrice').textContent = price;
  document.getElementById('modalTag').textContent = cat + ' · ' + year;
  document.getElementById('modalDesc').textContent = desc;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// =====================================================
// CONTACT FORM
// =====================================================
function handleContact(e) {
  e.preventDefault();
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
  return false;
}

// =====================================================
// SCROLL REVEAL (simple)
// =====================================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .catalog-card, .cat-card, .process-step, .team-card, .faq-item, .timeline-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
