/**
 * IVY moda — Áo Kiểu White Verse
 * Product detail page interactive logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. Thumbnail Gallery Switcher ──
  const thumbs = document.querySelectorAll('.thumb-item');
  const mainImg = document.getElementById('mainProductImg');

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      const targetSrc = thumb.getAttribute('data-full');
      if (targetSrc && mainImg) {
        mainImg.style.opacity = '0.3';
        setTimeout(() => {
          mainImg.src = targetSrc;
          mainImg.style.opacity = '1';
        }, 150);
      }
    });
  });

  // ── 2. Size Selector ──
  const sizeBtns = document.querySelectorAll('.size-btn');
  const selectedSizeLabel = document.getElementById('selectedSizeLabel');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sizeVal = btn.getAttribute('data-size');
      if (selectedSizeLabel) {
        selectedSizeLabel.textContent = sizeVal;
      }
    });
  });

  // ── 3. Quantity Stepper ──
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');
  const qtyInput = document.getElementById('qtyInput');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
      }
    });

    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      qtyInput.value = val + 1;
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value, 10);
      if (isNaN(val) || val < 1) {
        qtyInput.value = 1;
      }
    });
  }

  // ── 4. Accordion Toggle ──
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        accordionItems.forEach(other => other.classList.remove('active'));
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });

  // ── 5. Size Guide Modal ──
  const sizeGuideModal = document.getElementById('sizeGuideModal');
  const openSizeGuideBtn = document.getElementById('openSizeGuide');
  const closeSizeGuideBtn = document.getElementById('closeSizeGuide');

  if (openSizeGuideBtn && sizeGuideModal) {
    openSizeGuideBtn.addEventListener('click', (e) => {
      e.preventDefault();
      sizeGuideModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeSizeGuideBtn && sizeGuideModal) {
    closeSizeGuideBtn.addEventListener('click', () => {
      sizeGuideModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    sizeGuideModal.addEventListener('click', (e) => {
      if (e.target === sizeGuideModal) {
        sizeGuideModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── 6. Add to Cart & Toast Feedback ──
  const addToCartBtns = document.querySelectorAll('.js-add-to-cart');
  const cartCounter = document.getElementById('cartCounter');
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  let cartCount = 0;
  let toastTimer = null;

  function showToast(message) {
    if (!toastMsg) return;
    if (toastText) toastText.textContent = message;
    toastMsg.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3000);
  }

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeSize = document.querySelector('.size-btn.active')?.getAttribute('data-size') || 'S';
      const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
      cartCount += qty;
      if (cartCounter) {
        cartCounter.textContent = cartCount;
        cartCounter.style.display = 'flex';
      }
      showToast(`Đã thêm ${qty} x Áo kiểu White Verse (Size ${activeSize}) vào giỏ hàng!`);
    });
  });

  // ── 7. Fast Order Modal (Buy Now) ──
  const buyNowModal = document.getElementById('buyNowModal');
  const buyNowBtns = document.querySelectorAll('.js-buy-now');
  const closeBuyNowBtn = document.getElementById('closeBuyNow');
  const orderForm = document.getElementById('fastOrderForm');
  const orderModalSize = document.getElementById('orderModalSize');
  const orderModalQty = document.getElementById('orderModalQty');
  const orderModalTotal = document.getElementById('orderModalTotal');

  const unitPrice = 1290000;

  function formatVND(amount) {
    return amount.toLocaleString('vi-VN') + '₫';
  }

  buyNowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeSize = document.querySelector('.size-btn.active')?.getAttribute('data-size') || 'S';
      const qty = parseInt(qtyInput ? qtyInput.value : 1, 10) || 1;
      if (orderModalSize) orderModalSize.textContent = activeSize;
      if (orderModalQty) orderModalQty.textContent = qty;
      if (orderModalTotal) orderModalTotal.textContent = formatVND(unitPrice * qty);

      if (buyNowModal) {
        buyNowModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (closeBuyNowBtn && buyNowModal) {
    closeBuyNowBtn.addEventListener('click', () => {
      buyNowModal.classList.remove('open');
      document.body.style.overflow = '';
    });

    buyNowModal.addEventListener('click', (e) => {
      if (e.target === buyNowModal) {
        buyNowModal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('orderName')?.value || 'Quý khách';
      const phone = document.getElementById('orderPhone')?.value || '';
      buyNowModal.classList.remove('open');
      document.body.style.overflow = '';
      showToast(`Cảm ơn ${name}! IVY moda sẽ liên hệ số ${phone} để giao hàng sớm nhất.`);
      orderForm.reset();
    });
  }
});
