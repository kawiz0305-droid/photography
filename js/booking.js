/**
 * KAWIZZ PHOTOGRAPHY - BOOKING, PRICING & INTERACTIVE TOOLS
 * Before-After Comparison Slider, WhatsApp Booking Generator, Pricing Calculator, FAQ Accordion
 */

document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSliders();
  initFaqAccordion();
  initBookingForm();
  initPricingCalculator();
});

/* -------------------------------------------------------------------------- */
/* Interactive Before-After Comparison Slider                                */
/* -------------------------------------------------------------------------- */
function initBeforeAfterSliders() {
  const container = document.getElementById('beforeAfterSlider');
  if (!container) return;

  const wrapper = container.querySelector('.img-after-wrapper');
  const handle = container.querySelector('.before-after-slider-handle');
  if (!wrapper || !handle) return;

  let isDragging = false;

  const setSliderPosition = (x) => {
    const rect = container.getBoundingClientRect();
    let posX = x - rect.left;
    if (posX < 0) posX = 0;
    if (posX > rect.width) posX = rect.width;

    const percentage = (posX / rect.width) * 100;
    wrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => { isDragging = false; });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  // Touch Support
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => { isDragging = false; });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    setSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* -------------------------------------------------------------------------- */
/* FAQ Accordion                                                              */
/* -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const accordions = document.querySelectorAll('.faq-item');
  accordions.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');
    const icon = item.querySelector('.faq-icon');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = !content.classList.contains('hidden');

        // Close all others
        document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
        document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

        if (!isOpen) {
          content.classList.remove('hidden');
          if (icon) icon.classList.add('rotate-180');
        }
      });
    }
  });
}

/* -------------------------------------------------------------------------- */
/* Booking & Contact Form Handler (Direct WhatsApp Connect)                   */
/* -------------------------------------------------------------------------- */
function initBookingForm() {
  const form = document.getElementById('bookingInquiryForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('inquiryName')?.value.trim();
    const phone = document.getElementById('inquiryPhone')?.value.trim();
    const email = document.getElementById('inquiryEmail')?.value.trim();
    const eventType = document.getElementById('inquiryEventType')?.value;
    const eventDate = document.getElementById('inquiryDate')?.value;
    const venue = document.getElementById('inquiryVenue')?.value.trim();
    const packageChoice = document.getElementById('inquiryPackage')?.value;
    const message = document.getElementById('inquiryMessage')?.value.trim();

    if (!name || !phone || !eventDate) {
      showToast('Please fill in your Name, Phone Number, and Event Date.', 'error');
      return;
    }

    // Format WhatsApp message
    const waText = 
`*NEW BOOKING INQUIRY - KAWIZZ PHOTOGRAPHY*
---------------------------------------
👤 *Client Name:* ${name}
📞 *Phone / WhatsApp:* ${phone}
📧 *Email:* ${email || 'Not specified'}
💍 *Event Type:* ${eventType}
📅 *Event Date:* ${eventDate}
📍 *Venue / City:* ${venue || 'Sri Lanka'}
📦 *Interested Package:* ${packageChoice || 'Custom Consultation'}
📝 *Special Notes:*
${message || 'Please send available dates and formal quotation.'}
---------------------------------------
Sent via Kawizz Photography Official Website.`;

    const encodedText = encodeURIComponent(waText);
    const waUrl = `https://wa.me/94774045147?text=${encodedText}`;

    showToast('Inquiry Ready! Opening WhatsApp to send directly to Kawizz...', 'success');

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 1200);
  });
}

/* -------------------------------------------------------------------------- */
/* Interactive Pricing / Quote Calculator (on Services page)                  */
/* -------------------------------------------------------------------------- */
function initPricingCalculator() {
  const calcContainer = document.getElementById('pricingCalculator');
  if (!calcContainer) return;

  const baseSelect = document.getElementById('calcBasePackage');
  const addDrone = document.getElementById('calcAddDrone');
  const addAlbum = document.getElementById('calcAddAlbum');
  const addPreShoot = document.getElementById('calcAddPreShoot');
  const totalLkrEl = document.getElementById('calcTotalLKR');
  const totalUsdEl = document.getElementById('calcTotalUSD');

  const recalculate = () => {
    let baseLKR = parseInt(baseSelect ? baseSelect.value : 185000, 10);
    
    if (addDrone && addDrone.checked) baseLKR += 45000;
    if (addAlbum && addAlbum.checked) baseLKR += 35000;
    if (addPreShoot && addPreShoot.checked) baseLKR += 50000;

    const baseUSD = Math.round(baseLKR / 300);

    if (totalLkrEl) totalLkrEl.textContent = `LKR ${baseLKR.toLocaleString()}`;
    if (totalUsdEl) totalUsdEl.textContent = `~ $${baseUSD.toLocaleString()} USD`;
  };

  if (baseSelect) baseSelect.addEventListener('change', recalculate);
  if (addDrone) addDrone.addEventListener('change', recalculate);
  if (addAlbum) addAlbum.addEventListener('change', recalculate);
  if (addPreShoot) addPreShoot.addEventListener('change', recalculate);

  recalculate();
}
