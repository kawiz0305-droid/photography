/**
 * KAWIZZ PHOTOGRAPHY - CORE SCRIPT
 * Navigation, Toasts, Responsive Drawer, Download Triggers, Custom Cursor & Micro-Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initCustomCursor();
  initBackToTop();
  initToastSystem();
  renderDynamicFooterYear();
  initGlobalEvents();
});

/* -------------------------------------------------------------------------- */
/* Navbar sticky blur & active state                                         */
/* -------------------------------------------------------------------------- */
function initNavbar() {
  const navbar = document.getElementById('mainNavbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('bg-black/90', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3', 'shadow-2xl');
      navbar.classList.remove('bg-transparent', 'py-5');
    } else {
      navbar.classList.remove('bg-black/90', 'backdrop-blur-md', 'border-b', 'border-white/10', 'py-3', 'shadow-2xl');
      navbar.classList.add('bg-transparent', 'py-5');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // Highlight current page nav link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('text-[#e2b774]', 'font-semibold');
      link.classList.remove('text-gray-300');
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Mobile Menu Drawer                                                         */
/* -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const closeDrawer = document.getElementById('closeMobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');

  if (!menuToggle || !mobileDrawer) return;

  const openMenu = () => {
    mobileDrawer.classList.remove('translate-x-full');
    if (drawerOverlay) drawerOverlay.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileDrawer.classList.add('translate-x-full');
    if (drawerOverlay) drawerOverlay.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  };

  menuToggle.addEventListener('click', openMenu);
  if (closeDrawer) closeDrawer.addEventListener('click', closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);
}

/* -------------------------------------------------------------------------- */
/* Custom Luxury Cursor Follower                                             */
/* -------------------------------------------------------------------------- */
function initCustomCursor() {
  // Only enable on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let cursorDot = document.getElementById('cursorDot');
  let cursorOutline = document.getElementById('cursorOutline');

  if (!cursorDot) {
    cursorDot = document.createElement('div');
    cursorDot.id = 'cursorDot';
    cursorDot.className = 'fixed top-0 left-0 w-2 h-2 rounded-full bg-[#e2b774] pointer-events-none z-[99999] transition-transform duration-75 -translate-x-1/2 -translate-y-1/2';
    document.body.appendChild(cursorDot);
  }

  if (!cursorOutline) {
    cursorOutline = document.createElement('div');
    cursorOutline.id = 'cursorOutline';
    cursorOutline.className = 'fixed top-0 left-0 w-8 h-8 rounded-full border border-[#e2b774]/50 pointer-events-none z-[99998] transition-all duration-200 ease-out -translate-x-1/2 -translate-y-1/2';
    document.body.appendChild(cursorOutline);
  }

  window.addEventListener('mousemove', (e) => {
    cursorDot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorOutline.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Scale cursor on hover over buttons and links
  const interactiveEls = document.querySelectorAll('a, button, input, select, textarea, .photo-card, .clickable');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('scale-150', 'border-[#e2b774]', 'bg-[#e2b774]/10');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('scale-150', 'border-[#e2b774]', 'bg-[#e2b774]/10');
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Back to top button                                                         */
/* -------------------------------------------------------------------------- */
function initBackToTop() {
  const backToTop = document.getElementById('backToTopBtn');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTop.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTop.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTop.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* -------------------------------------------------------------------------- */
/* Toast Notification System                                                  */
/* -------------------------------------------------------------------------- */
function initToastSystem() {
  if (!document.getElementById('toastContainer')) {
    const container = document.createElement('div');
    container.id = 'toastContainer';
    document.body.appendChild(container);
  }
}

function showToast(message, type = 'success', iconName = 'check-circle') {
  const container = document.getElementById('toastContainer') || document.body;
  const toast = document.createElement('div');
  toast.className = 'toast';

  const iconColor = type === 'success' ? 'text-emerald-400' : type === 'error' ? 'text-rose-400' : 'text-[#e2b774]';
  
  toast.innerHTML = `
    <div class="flex-shrink-0 ${iconColor}">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <div class="text-sm font-medium text-gray-100">${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* -------------------------------------------------------------------------- */
/* High Resolution Photo Downloader Helper                                    */
/* -------------------------------------------------------------------------- */
async function downloadPhotoFile(url, suggestedFilename = 'Kawizz_Photography_Master.jpg') {
  showToast('Preparing High-Resolution Master File...', 'info');
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = suggestedFilename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    showToast(`Downloaded: ${suggestedFilename}`, 'success');
  } catch (error) {
    console.warn('Direct blob download restricted by CORS, fallback to direct open:', error);
    // Fallback
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.download = suggestedFilename;
    link.click();
    showToast('Download opened in new tab!', 'success');
  }
}

/* -------------------------------------------------------------------------- */
/* Dynamic Footer Year                                                        */
/* -------------------------------------------------------------------------- */
function renderDynamicFooterYear() {
  const yearEls = document.querySelectorAll('.dynamic-year');
  const year = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = year);
}

/* -------------------------------------------------------------------------- */
/* Global Event Helpers                                                       */
/* -------------------------------------------------------------------------- */
function initGlobalEvents() {
  // Global copy link helper
  window.copyGalleryLink = function(url = window.location.href) {
    navigator.clipboard.writeText(url).then(() => {
      showToast('Gallery Link Copied to Clipboard!', 'success');
    });
  };
}
