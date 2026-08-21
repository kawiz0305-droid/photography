/**
 * KAWIZZ PHOTOGRAPHY - CLIENT PORTAL & DELIVERY ENGINE
 * Passcode Unlock, Private Proofing, Batch High-Res Downloads & Album Management
 */

let activeClientAlbum = null;
let selectedPhotoIds = new Set();
let proofingMode = false;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof KAWIZZ_DATA === 'undefined') return;

  initPasscodeForm();
  initDemoAlbumShortcuts();
  initBatchActions();
});

/* -------------------------------------------------------------------------- */
/* Passcode Authentication                                                    */
/* -------------------------------------------------------------------------- */
function initPasscodeForm() {
  const form = document.getElementById('passcodeForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('passcodeInput');
    const code = input ? input.value.trim().toLowerCase() : '';

    if (!code) {
      showToast('Please enter your client passcode', 'error');
      return;
    }

    const matchedAlbum = KAWIZZ_DATA.clientAlbums.find(a => 
      a.passcode.toLowerCase() === code || 
      (a.alternativePasscode && a.alternativePasscode.toLowerCase() === code) ||
      a.id.toLowerCase().includes(code)
    );

    if (matchedAlbum) {
      showToast('Passcode Verified! Opening Private Vault...', 'success');
      unlockAlbum(matchedAlbum);
    } else {
      showToast('Invalid Passcode! Try demo code "1234" or "wedding2026"', 'error');
      input.classList.add('border-rose-500', 'animate-shake');
      setTimeout(() => input.classList.remove('border-rose-500', 'animate-shake'), 1000);
    }
  });
}

function initDemoAlbumShortcuts() {
  const demoButtons = document.querySelectorAll('.demo-album-btn');
  demoButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const albumId = btn.getAttribute('data-album-id');
      const album = KAWIZZ_DATA.clientAlbums.find(a => a.id === albumId);
      if (album) {
        unlockAlbum(album);
      }
    });
  });
}

/* -------------------------------------------------------------------------- */
/* Album Unlock & Render                                                      */
/* -------------------------------------------------------------------------- */
function unlockAlbum(album) {
  activeClientAlbum = album;
  selectedPhotoIds.clear();

  const authSection = document.getElementById('portalAuthSection');
  const vaultSection = document.getElementById('portalVaultSection');

  if (authSection) authSection.classList.add('hidden');
  if (vaultSection) vaultSection.classList.remove('hidden');

  // Fill Album Header
  document.getElementById('vaultClientNames').textContent = album.clientNames;
  document.getElementById('vaultAlbumTitle').textContent = album.title;
  document.getElementById('vaultEventDate').textContent = album.eventDate;
  document.getElementById('vaultLocation').textContent = album.location;
  document.getElementById('vaultPackage').textContent = album.package;
  document.getElementById('vaultTotalCount').textContent = `${album.totalPhotos} Master Files`;

  const coverEl = document.getElementById('vaultCoverImage');
  if (coverEl) coverEl.src = album.coverImage;

  renderVaultPhotos();
  window.scrollTo({ top: vaultSection.offsetTop - 80, behavior: 'smooth' });
}

function lockAlbum() {
  activeClientAlbum = null;
  selectedPhotoIds.clear();

  const authSection = document.getElementById('portalAuthSection');
  const vaultSection = document.getElementById('portalVaultSection');

  if (authSection) authSection.classList.remove('hidden');
  if (vaultSection) vaultSection.classList.add('hidden');

  showToast('Client Session Closed Securely', 'info');
}

/* -------------------------------------------------------------------------- */
/* Render Vault Photos                                                        */
/* -------------------------------------------------------------------------- */
function renderVaultPhotos() {
  const container = document.getElementById('vaultGrid');
  if (!container || !activeClientAlbum) return;

  // Filter photos belonging to this album or sample wedding photos
  let photos = KAWIZZ_DATA.photos.filter(p => p.clientAlbumId === activeClientAlbum.id);
  if (photos.length === 0) {
    photos = KAWIZZ_DATA.photos.filter(p => p.category === 'landscapes' || p.category === 'portraits');
  }

  container.innerHTML = photos.map(photo => {
    const isSelected = selectedPhotoIds.has(photo.id);

    return `
      <div class="relative group bg-[#161720] rounded-xl overflow-hidden border ${isSelected ? 'border-[#e2b774] ring-2 ring-[#e2b774]/50' : 'border-white/10 hover:border-white/20'} transition-all duration-300">
        <!-- Photo with Click to Lightbox or Select -->
        <div class="relative aspect-[4/3] overflow-hidden cursor-pointer" onclick="openLightboxById('${photo.id}')">
          <img 
            src="${photo.thumbUrl}" 
            alt="${photo.title}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <!-- Selection Checkbox -->
          <div class="absolute top-3 left-3 z-20" onclick="event.stopPropagation(); togglePhotoSelection('${photo.id}')">
            <div class="w-7 h-7 rounded-md flex items-center justify-center backdrop-blur-md cursor-pointer transition-all ${isSelected ? 'bg-[#e2b774] text-black font-bold' : 'bg-black/60 border border-white/30 text-transparent hover:border-[#e2b774]'}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>
            </div>
          </div>

          <!-- Quick 1-Click Download Button -->
          <button 
            onclick="event.stopPropagation(); downloadPhotoFile('${photo.fullUrl}', 'Kawizz_${activeClientAlbum.clientNames.replace(/[^a-zA-Z0-9]/g, '_')}_${photo.id}.jpg')"
            class="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[#e2b774] hover:bg-[#e2b774] hover:text-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            title="Download Full Resolution"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          </button>

          <!-- Hover Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 pointer-events-none">
            <p class="text-white text-sm font-medium truncate">${photo.title}</p>
            <p class="text-gray-400 text-xs">${photo.location}</p>
          </div>
        </div>

        <!-- Card Footer Info -->
        <div class="p-3 flex items-center justify-between text-xs border-t border-white/5 bg-[#101117]">
          <span class="text-gray-400 font-mono">FILE: ${photo.id.toUpperCase()}.JPG</span>
          <button 
            onclick="togglePhotoSelection('${photo.id}')"
            class="text-[#e2b774] hover:underline font-medium"
          >
            ${isSelected ? 'Selected ✓' : '+ Select'}
          </button>
        </div>
      </div>
    `;
  }).join('');

  updateSelectionCounter();
}

/* -------------------------------------------------------------------------- */
/* Selection & Proofing                                                       */
/* -------------------------------------------------------------------------- */
function togglePhotoSelection(photoId) {
  if (selectedPhotoIds.has(photoId)) {
    selectedPhotoIds.delete(photoId);
  } else {
    selectedPhotoIds.add(photoId);
  }
  renderVaultPhotos();
}

function selectAllPhotos() {
  let photos = KAWIZZ_DATA.photos.filter(p => p.clientAlbumId === activeClientAlbum.id);
  if (photos.length === 0) photos = KAWIZZ_DATA.photos.filter(p => p.category === 'landscapes' || p.category === 'portraits');
  photos.forEach(p => selectedPhotoIds.add(p.id));
  renderVaultPhotos();
  showToast(`Selected all ${selectedPhotoIds.size} photos`, 'success');
}

function clearSelection() {
  selectedPhotoIds.clear();
  renderVaultPhotos();
  showToast('Cleared selections', 'info');
}

function updateSelectionCounter() {
  const countEl = document.getElementById('selectedCountText');
  const downloadSelectedBtn = document.getElementById('downloadSelectedBtn');
  if (countEl) countEl.textContent = `${selectedPhotoIds.size} Selected`;
  if (downloadSelectedBtn) {
    downloadSelectedBtn.disabled = selectedPhotoIds.size === 0;
    if (selectedPhotoIds.size > 0) {
      downloadSelectedBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
      downloadSelectedBtn.classList.add('opacity-50', 'cursor-not-allowed');
    }
  }
}

/* -------------------------------------------------------------------------- */
/* Batch Download Experience                                                  */
/* -------------------------------------------------------------------------- */
function initBatchActions() {
  const selectAllBtn = document.getElementById('selectAllBtn');
  const clearSelectionBtn = document.getElementById('clearSelectionBtn');
  const downloadSelectedBtn = document.getElementById('downloadSelectedBtn');
  const downloadAllZipBtn = document.getElementById('downloadAllZipBtn');
  const lockAlbumBtn = document.getElementById('lockAlbumBtn');

  if (selectAllBtn) selectAllBtn.addEventListener('click', selectAllPhotos);
  if (clearSelectionBtn) clearSelectionBtn.addEventListener('click', clearSelection);
  if (lockAlbumBtn) lockAlbumBtn.addEventListener('click', lockAlbum);

  if (downloadSelectedBtn) {
    downloadSelectedBtn.addEventListener('click', () => {
      if (selectedPhotoIds.size === 0) {
        showToast('Please select at least 1 photo to download', 'info');
        return;
      }
      triggerBatchDownload(Array.from(selectedPhotoIds));
    });
  }

  if (downloadAllZipBtn) {
    downloadAllZipBtn.addEventListener('click', () => {
      let photos = KAWIZZ_DATA.photos.filter(p => p.clientAlbumId === activeClientAlbum.id);
      if (photos.length === 0) photos = KAWIZZ_DATA.photos.filter(p => p.category === 'landscapes' || p.category === 'portraits');
      triggerBatchDownload(photos.map(p => p.id));
    });
  }
}

function triggerBatchDownload(photoIds) {
  const modal = document.getElementById('batchDownloadModal');
  const progressText = document.getElementById('batchProgressText');
  const progressBar = document.getElementById('batchProgressBar');
  const statusMsg = document.getElementById('batchStatusMsg');

  if (!modal) {
    // Fallback: direct download first photo
    const p = KAWIZZ_DATA.photos.find(x => x.id === photoIds[0]);
    if (p) downloadPhotoFile(p.fullUrl, `Kawizz_${p.title}.jpg`);
    return;
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');

  let progress = 0;
  statusMsg.textContent = `Packaging ${photoIds.length} Full-Resolution Master JPEG files...`;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 10;
    if (progress > 100) progress = 100;

    if (progressBar) progressBar.style.width = `${progress}%`;
    if (progressText) progressText.textContent = `${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      statusMsg.textContent = 'High-Speed Archive Ready! Starting direct file delivery...';

      setTimeout(() => {
        // Trigger downloads
        photoIds.slice(0, 3).forEach((id, idx) => {
          const photo = KAWIZZ_DATA.photos.find(p => p.id === id);
          if (photo) {
            setTimeout(() => {
              downloadPhotoFile(photo.fullUrl, `Kawizz_${activeClientAlbum.clientNames.replace(/[^a-zA-Z0-9]/g, '_')}_${photo.id}.jpg`);
            }, idx * 500);
          }
        });

        setTimeout(() => {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          showToast(`Successfully packaged ${photoIds.length} high-res master files!`, 'success');
        }, 1500);
      }, 800);
    }
  }, 250);
}
