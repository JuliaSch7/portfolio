/* ============================================================
   Julia Schirrmeister — Portfolio
   Main Script
   ============================================================ */

/* === Dark Mode === */
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.removeAttribute('data-theme');
  }
  updateToggleLabel();
}

function toggleTheme() {
  const isDark = html.getAttribute('data-theme') === 'dark';
  if (isDark) {
    html.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  updateToggleLabel();
}

function updateToggleLabel() {
  if (!themeToggle) return;
  const isDark = html.getAttribute('data-theme') === 'dark';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

// Run before paint to prevent flash
initTheme();
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);

/* === Works Dropdown === */
const dropdownTrigger = document.querySelector('.nav-dropdown-trigger');
const dropdownMenu    = document.querySelector('.nav-dropdown-menu');

function openDropdown() {
  if (!dropdownTrigger || !dropdownMenu) return;
  dropdownTrigger.setAttribute('aria-expanded', 'true');
  dropdownMenu.setAttribute('data-open', 'true');
}

function closeDropdown() {
  if (!dropdownTrigger || !dropdownMenu) return;
  dropdownTrigger.setAttribute('aria-expanded', 'false');
  dropdownMenu.setAttribute('data-open', 'false');
}

if (dropdownTrigger && dropdownMenu) {
  dropdownTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = dropdownTrigger.getAttribute('aria-expanded') === 'true';
    isOpen ? closeDropdown() : openDropdown();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdownTrigger.closest('.nav-dropdown').contains(e.target)) {
      closeDropdown();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && dropdownTrigger.getAttribute('aria-expanded') === 'true') {
      closeDropdown();
      dropdownTrigger.focus();
    }
  });

  // Keep open while tabbing through items
  const items = dropdownMenu.querySelectorAll('.nav-dropdown-item');
  items.forEach((item, i) => {
    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[Math.min(i + 1, items.length - 1)].focus();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (i === 0) { dropdownTrigger.focus(); closeDropdown(); }
        else items[i - 1].focus();
      }
      if (e.key === 'Escape') {
        closeDropdown();
        dropdownTrigger.focus();
      }
    });
  });
}

/* === Mobile Menu === */
const mobileToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

const hamburgerSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;
const closeSVG = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('is-open');
    navLinks.classList.toggle('is-open');
    mobileToggle.setAttribute('aria-expanded', String(!isOpen));
    mobileToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
    mobileToggle.innerHTML = isOpen ? hamburgerSVG : closeSVG;
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
      navLinks.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileToggle.innerHTML = hamburgerSVG;
      document.body.style.overflow = '';
    }
  });
}

/* === Active Nav Link === */
(function setActiveLink() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const page = href.split('/').pop().replace('.html', '');
    if (page && path.includes(page)) link.classList.add('active');
  });
})();

/* === Smooth scroll for anchor links === */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
