/**
 * KAWIZZ PHOTOGRAPHY - GALLERY & LIGHTBOX ENGINE
 * Filtering, Search, Masonry Grid, Interactive EXIF Lightbox, Zoom, Likes & High-Res Downloads
 */

let currentPhotoIndex = 0;
let filteredPhotos = [];
let currentZoom = 1;
let likedPhotos = JSON.parse(localStorage.getItem('kawizz_liked_photos') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  if (typeof KAWIZZ_DATA === 'undefined') return;
  filteredPhotos = [...KAWIZZ_DATA.photos];

  initGalleryGrid();
  initGalleryFilters();
  initGallerySearch();
  initLightbox();
});

/* -------------------------------------------------------------------------- */
/* Gallery Grid Rendering                                                     */
/* -------------------------------------------------------------------------- */
function initGalleryGrid() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  renderGallery(filteredPhotos);
}

function renderGallery(photosToRender) {
  const container = document.getElementById('galleryGrid');
  const countEl = document.getElementById('photoCount');
  if (!container) return;

  if (countEl) {
    countEl.textContent = `Showing ${photosToRender.length} masterworks`;
  }

  if (photosToRender.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-20 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 text-[#e2b774] mb-4">
          <i data-lucide="image-off" class="w-8 h-8"></i>
        </div>
        <h3 class="text-xl font-medium text-white mb-2">No Photographs Found</h3>
        <p class="text-gray-400 text-sm max-w-md mx-auto">No photos match your current filter or search criteria. Try selecting 'All' or searching for another location/style.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  container.innerHTML = photosToRender.map((photo, index) => {
    const isLiked = likedPhotos.includes(photo.id);
    const likeCount = photo.likes + (isLiked ? 1 : 0);

    return `
      <div class="masonry-item group relative photo-card border border-white/5 hover:border-[#e2b774]/40 transition-all duration-500 rounded-xl overflow-hidden bg-[#12131a]" data-id="${photo.id}" data-category="${photo.category}">
        <!-- Image with Lazy Load -->
        <div class="relative overflow-hidden cursor-pointer" onclick="openLightboxById('${photo.id}')">
          <img 
            src="${photo.thumbUrl}" 
            alt="${photo.title}" 
            loading="lazy"
            class="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          
          <!-- Category Pill -->
          <div class="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span class="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-black/60 backdrop-blur-md text-[#e2b774] border border-[#e2b774]/30">
              ${photo.category}
            </span>
            ${photo.tags && photo.tags.includes('original') ? `
              <span class="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[#e2b774] text-black shadow-lg">
                ★ Kawizz Original
              </span>
            ` : ''}
          </div>

          <!-- Quick Action Buttons -->
          <div class="absolute top-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onclick="event.stopPropagation(); toggleLike('${photo.id}', this)"
              class="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center ${isLiked ? 'text-rose-500' : 'text-white'} hover:text-rose-400 hover:scale-110 transition-all"
              title="Favorite Photo"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </button>
            <button 
              onclick="event.stopPropagation(); downloadPhotoFile('${photo.fullUrl}', 'Kawizz_${photo.title.replace(/[^a-zA-Z0-9]/g, '_')}_HighRes.jpg')"
              class="w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#e2b774] hover:bg-[#e2b774] hover:text-black hover:scale-110 transition-all"
              title="Download High-Res Master"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </button>
          </div>

          <!-- Bottom Gradient Info Overlay -->
          <div class="photo-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-5 text-left">
            <h4 class="text-white font-serif text-lg font-semibold tracking-wide leading-snug drop-shadow-md">${photo.title}</h4>
            <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-xs text-gray-300">
              <span class="flex items-center gap-1.5 text-gray-300">
                <svg class="w-3.5 h-3.5 text-[#e2b774]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                ${photo.location}
              </span>
              <span class="text-[#e2b774] font-mono text-[11px]">${photo.camera.split(' ')[1] || 'Sony'} • ${photo.aperture}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) lucide.createIcons();
}

/* -------------------------------------------------------------------------- */
/* Gallery Filters                                                            */
/* -------------------------------------------------------------------------- */
function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  if (!filterButtons.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-[#e2b774]', 'text-black', 'font-semibold', 'shadow-lg');
        b.classList.add('bg-white/5', 'text-gray-300', 'hover:bg-white/10');
      });
      btn.classList.add('bg-[#e2b774]', 'text-black', 'font-semibold', 'shadow-lg');
      btn.classList.remove('bg-white/5', 'text-gray-300', 'hover:bg-white/10');

      const category = btn.getAttribute('data-filter');
      applyFiltersAndSearch(category);
    });
  });
}

function initGallerySearch() {
  const searchInput = document.getElementById('gallerySearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const activeFilterBtn = document.querySelector('.filter-btn.bg-\\[\\#e2b774\\]');
    const category = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';
    applyFiltersAndSearch(category, e.target.value);
  });
}

function applyFiltersAndSearch(category = 'all', searchQuery = '') {
  const searchInput = document.getElementById('gallerySearchInput');
  const query = (searchQuery || (searchInput ? searchInput.value : '')).toLowerCase().trim();

  filteredPhotos = KAWIZZ_DATA.photos.filter(photo => {
    const matchCategory = category === 'all' || photo.category === category;
    const matchSearch = query === '' || 
      photo.title.toLowerCase().includes(query) ||
      photo.location.toLowerCase().includes(query) ||
      photo.camera.toLowerCase().includes(query) ||
      photo.tags.some(tag => tag.toLowerCase().includes(query));
    return matchCategory && matchSearch;
  });

  renderGallery(filteredPhotos);
}

/* -------------------------------------------------------------------------- */
/* Like / Favorite Toggle                                                     */
/* -------------------------------------------------------------------------- */
function toggleLike(photoId, btnElement) {
  const index = likedPhotos.indexOf(photoId);
  if (index > -1) {
    likedPhotos.splice(index, 1);
    if (btnElement) btnElement.classList.replace('text-rose-500', 'text-white');
    showToast('Removed from favorites', 'info');
  } else {
    likedPhotos.push(photoId);
    if (btnElement) btnElement.classList.replace('text-white', 'text-rose-500');
    showToast('Saved to your favorites ❤️', 'success');
  }
  localStorage.setItem('kawizz_liked_photos', JSON.stringify(likedPhotos));
}

/* -------------------------------------------------------------------------- */
/* Fullscreen Lightbox & EXIF Engine                                          */
/* -------------------------------------------------------------------------- */
function initLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const zoomInBtn = document.getElementById('lightboxZoomIn');
  const zoomOutBtn = document.getElementById('lightboxZoomOut');
  const zoomResetBtn = document.getElementById('lightboxZoomReset');
  const exifToggleBtn = document.getElementById('lightboxExifToggle');
  const downloadBtn = document.getElementById('lightboxDownloadBtn');
  const copyShareBtn = document.getElementById('lightboxShareBtn');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
  if (nextBtn) nextBtn.addEventListener('click', nextPhoto);

  if (zoomInBtn) zoomInBtn.addEventListener('click', () => adjustZoom(0.25));
  if (zoomOutBtn) zoomOutBtn.addEventListener('click', () => adjustZoom(-0.25));
  if (zoomResetBtn) zoomResetBtn.addEventListener('click', () => resetZoom());

  if (exifToggleBtn) {
    exifToggleBtn.addEventListener('click', () => {
      const panel = document.getElementById('lightboxExifPanel');
      if (panel) {
        panel.classList.toggle('hidden');
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const currentPhoto = filteredPhotos[currentPhotoIndex] || KAWIZZ_DATA.photos[currentPhotoIndex];
      if (currentPhoto) {
        downloadPhotoFile(currentPhoto.fullUrl, `Kawizz_${currentPhoto.title.replace(/[^a-zA-Z0-9]/g, '_')}_Master.jpg`);
      }
    });
  }

  if (copyShareBtn) {
    copyShareBtn.addEventListener('click', () => {
      const currentPhoto = filteredPhotos[currentPhotoIndex] || KAWIZZ_DATA.photos[currentPhotoIndex];
      if (currentPhoto) {
        const shareUrl = `${window.location.origin}${window.location.pathname}?photo=${currentPhoto.id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
          showToast('Direct photo link copied to clipboard!', 'success');
        });
      }
    });
  }

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevPhoto();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === '+' || e.key === '=') adjustZoom(0.25);
    if (e.key === '-') adjustZoom(-0.25);
    if (e.key === '0') resetZoom();
  });

  // Check URL query for direct photo open
  const urlParams = new URLSearchParams(window.location.search);
  const directPhotoId = urlParams.get('photo');
  if (directPhotoId) {
    setTimeout(() => openLightboxById(directPhotoId), 300);
  }
}

function openLightboxById(photoId) {
  const list = filteredPhotos.length ? filteredPhotos : KAWIZZ_DATA.photos;
  const index = list.findIndex(p => p.id === photoId);
  if (index !== -1) {
    openLightbox(index);
  }
}

function openLightbox(index) {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;

  const list = filteredPhotos.length ? filteredPhotos : KAWIZZ_DATA.photos;
  if (index < 0 || index >= list.length) return;

  currentPhotoIndex = index;
  resetZoom();
  updateLightboxContent();

  modal.classList.remove('inactive');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.classList.add('inactive');
  document.body.style.overflow = '';
}

function prevPhoto() {
  const list = filteredPhotos.length ? filteredPhotos : KAWIZZ_DATA.photos;
  currentPhotoIndex = (currentPhotoIndex - 1 + list.length) % list.length;
  resetZoom();
  updateLightboxContent();
}

function nextPhoto() {
  const list = filteredPhotos.length ? filteredPhotos : KAWIZZ_DATA.photos;
  currentPhotoIndex = (currentPhotoIndex + 1) % list.length;
  resetZoom();
  updateLightboxContent();
}

function adjustZoom(delta) {
  const img = document.getElementById('lightboxImage');
  if (!img) return;
  currentZoom = Math.min(Math.max(0.75, currentZoom + delta), 3.0);
  img.style.transform = `scale(${currentZoom})`;
  const zoomDisplay = document.getElementById('zoomLevelDisplay');
  if (zoomDisplay) zoomDisplay.textContent = `${Math.round(currentZoom * 100)}%`;
}

function resetZoom() {
  const img = document.getElementById('lightboxImage');
  if (!img) return;
  currentZoom = 1;
  img.style.transform = 'scale(1)';
  const zoomDisplay = document.getElementById('zoomLevelDisplay');
  if (zoomDisplay) zoomDisplay.textContent = '100%';
}

function updateLightboxContent() {
  const list = filteredPhotos.length ? filteredPhotos : KAWIZZ_DATA.photos;
  const photo = list[currentPhotoIndex];
  if (!photo) return;

  const img = document.getElementById('lightboxImage');
  const title = document.getElementById('lightboxTitle');
  const subtitle = document.getElementById('lightboxSubtitle');
  const counter = document.getElementById('lightboxCounter');
  const desc = document.getElementById('lightboxDescription');

  // EXIF Elements
  const exifCamera = document.getElementById('exifCamera');
  const exifLens = document.getElementById('exifLens');
  const exifAperture = document.getElementById('exifAperture');
  const exifShutter = document.getElementById('exifShutter');
  const exifIso = document.getElementById('exifIso');
  const exifDate = document.getElementById('exifDate');
  const exifLocation = document.getElementById('exifLocation');

  if (img) {
    img.src = photo.fullUrl;
    img.alt = photo.title;
  }
  if (title) title.textContent = photo.title;
  if (subtitle) subtitle.textContent = `${photo.location} • ${photo.category.toUpperCase()}`;
  if (counter) counter.textContent = `${currentPhotoIndex + 1} / ${list.length}`;
  if (desc) desc.textContent = photo.description;

  if (exifCamera) exifCamera.textContent = photo.camera;
  if (exifLens) exifLens.textContent = photo.lens;
  if (exifAperture) exifAperture.textContent = photo.aperture;
  if (exifShutter) exifShutter.textContent = photo.shutterSpeed;
  if (exifIso) exifIso.textContent = `ISO ${photo.iso}`;
  if (exifDate) exifDate.textContent = photo.date;
  if (exifLocation) exifLocation.textContent = photo.location;
}
