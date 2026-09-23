/**
 * IVY moda — BST Daily Mood
 * Interactive Customer Consultation & VIP Intake Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultationForm');
  const formCard = document.getElementById('formCard');
  const successCard = document.getElementById('successCard');
  const submitBtn = document.getElementById('submitBtn');
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');

  // ── 1. Interactive Tag Chips (Phong cách & Sản phẩm) ──
  const styleChips = document.querySelectorAll('.js-chip-style');
  const productChips = document.querySelectorAll('.js-chip-product');
  const sizeChips = document.querySelectorAll('.js-chip-size');

  function setupMultiSelectChips(chips, hiddenInputId) {
    const hiddenInput = document.getElementById(hiddenInputId);
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('is-selected');
        updateHiddenValue();
      });
    });

    function updateHiddenValue() {
      if (!hiddenInput) return;
      const selected = Array.from(chips)
        .filter(c => c.classList.contains('is-selected'))
        .map(c => c.getAttribute('data-value') || c.textContent.trim());
      hiddenInput.value = selected.join(', ');
    }
  }

  function setupSingleSelectChips(chips, hiddenInputId) {
    const hiddenInput = document.getElementById(hiddenInputId);
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const wasSelected = chip.classList.contains('is-selected');
        chips.forEach(c => c.classList.remove('is-selected'));
        if (!wasSelected) {
          chip.classList.add('is-selected');
          if (hiddenInput) hiddenInput.value = chip.getAttribute('data-value') || chip.textContent.trim();
        } else {
          if (hiddenInput) hiddenInput.value = '';
        }
      });
    });
  }

  setupMultiSelectChips(styleChips, 'selectedStyles');
  setupMultiSelectChips(productChips, 'selectedProducts');
  setupSingleSelectChips(sizeChips, 'selectedSize');

  // ── 2. Consultation Channel Radio Cards ──
  const radioCards = document.querySelectorAll('.js-radio-channel');
  const showroomPicker = document.getElementById('showroomPicker');

  radioCards.forEach(card => {
    card.addEventListener('click', () => {
      radioCards.forEach(c => c.classList.remove('is-active'));
      card.classList.add('is-active');
      const radioInput = card.querySelector('input[type="radio"]');
      if (radioInput) radioInput.checked = true;

      // Check if showroom appointment is chosen
      const channelVal = radioInput ? radioInput.value : '';
      if (showroomPicker) {
        if (channelVal === 'showroom') {
          showroomPicker.classList.add('is-open');
        } else {
          showroomPicker.classList.remove('is-open');
        }
      }
    });
  });

  // ── 3. Toast Helper ──
  let toastTimer = null;
  function showToast(message, isSuccess = true) {
    if (!toastMsg || !toastText) return;
    toastText.textContent = message;
    const icon = toastMsg.querySelector('svg');
    if (icon) {
      icon.setAttribute('stroke', isSuccess ? '#27ae60' : '#D9383A');
    }
    toastMsg.style.transform = 'translateY(0)';
    toastMsg.style.opacity = '1';
    toastMsg.style.pointerEvents = 'auto';

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastMsg.style.transform = 'translateY(100px)';
      toastMsg.style.opacity = '0';
      toastMsg.style.pointerEvents = 'none';
    }, 3800);
  }

  // ── 4. Form Validation & Helpers ──
  function setFieldError(fieldId, errorMsg) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const parent = field.closest('.form-group');
    if (parent) {
      parent.classList.add('is-invalid');
      const errEl = parent.querySelector('.error-msg');
      if (errEl) errEl.textContent = errorMsg;
    }
    field.classList.add('has-error');
  }

  function clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    const parent = field.closest('.form-group');
    if (parent) {
      parent.classList.remove('is-invalid');
    }
    field.classList.remove('has-error');
  }

  // Live clear on input
  ['clientName', 'clientPhone', 'clientEmail', 'preferredCity', 'preferredShowroom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', () => clearFieldError(id));
      el.addEventListener('change', () => clearFieldError(id));
    }
  });

  function validateVietnamesePhone(phone) {
    const cleaned = phone.replace(/[\s\.-]/g, '');
    const vnf_regex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    return vnf_regex.test(cleaned);
  }

  function validateEmail(email) {
    if (!email) return true; // optional
    const email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email_regex.test(email);
  }

  // ── 5. Form Submission Handler ──
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name
      const nameInput = document.getElementById('clientName');
      const nameVal = nameInput ? nameInput.value.trim() : '';
      if (!nameVal || nameVal.length < 2) {
        setFieldError('clientName', 'Vui lòng nhập họ và tên của bạn (tối thiểu 2 ký tự).');
        isValid = false;
      } else {
        clearFieldError('clientName');
      }

      // Validate Phone
      const phoneInput = document.getElementById('clientPhone');
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      if (!phoneVal) {
        setFieldError('clientPhone', 'Vui lòng nhập số điện thoại để IVY moda liên hệ tư vấn.');
        isValid = false;
      } else if (!validateVietnamesePhone(phoneVal)) {
        setFieldError('clientPhone', 'Số điện thoại không hợp lệ (Ví dụ: 0912 345 678).');
        isValid = false;
      } else {
        clearFieldError('clientPhone');
      }

      // Validate Email
      const emailInput = document.getElementById('clientEmail');
      const emailVal = emailInput ? emailInput.value.trim() : '';
      if (emailVal && !validateEmail(emailVal)) {
        setFieldError('clientEmail', 'Định dạng email chưa đúng (Ví dụ: name@example.com).');
        isValid = false;
      } else {
        clearFieldError('clientEmail');
      }

      // Validate Showroom if selected
      const selectedChannel = document.querySelector('input[name="consultationChannel"]:checked')?.value || 'zalo';
      if (selectedChannel === 'showroom') {
        const showroomSelect = document.getElementById('preferredShowroom');
        if (showroomSelect && !showroomSelect.value) {
          setFieldError('preferredShowroom', 'Vui lòng chọn cơ sở Showroom bạn muốn ghé thử.');
          isValid = false;
        } else {
          clearFieldError('preferredShowroom');
        }
      }

      // Validate Agreement Checkbox
      const agreementCheck = document.getElementById('privacyAgreement');
      if (agreementCheck && !agreementCheck.checked) {
        showToast('Vui lòng đồng ý với điều khoản bảo mật trước khi tiếp tục.', false);
        return;
      }

      if (!isValid) {
        // Scroll to first invalid field
        const firstError = form.querySelector('.form-group.is-invalid');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }

      // Gather form data
      const leadData = {
        id: 'LEAD-' + Date.now().toString(36).toUpperCase(),
        createdAt: new Date().toISOString(),
        fullName: nameVal,
        phone: phoneVal,
        email: emailVal,
        city: document.getElementById('preferredCity')?.value || '',
        styles: document.getElementById('selectedStyles')?.value || '',
        products: document.getElementById('selectedProducts')?.value || '',
        size: document.getElementById('selectedSize')?.value || '',
        heightWeight: document.getElementById('heightWeight')?.value || '',
        consultationChannel: selectedChannel,
        showroom: selectedChannel === 'showroom' ? (document.getElementById('preferredShowroom')?.value || '') : '',
        appointmentDate: selectedChannel === 'showroom' ? (document.getElementById('appointmentDate')?.value || '') : '',
        notes: document.getElementById('clientNotes')?.value || '',
        voucherCode: 'DM-VIP' + Math.floor(1000 + Math.random() * 9000),
      };

      // Loading State
      if (submitBtn) {
        submitBtn.classList.add('is-loading');
        const btnText = submitBtn.querySelector('.btn-text');
        if (btnText) btnText.textContent = 'ĐANG TIẾP NHẬN THÔNG TIN...';
      }

      // Simulate API Submission
      setTimeout(() => {
        // Save to localStorage
        try {
          const existingLeads = JSON.parse(localStorage.getItem('ivy_daily_mood_leads') || '[]');
          existingLeads.unshift(leadData);
          localStorage.setItem('ivy_daily_mood_leads', JSON.stringify(existingLeads));
        } catch (err) {
          console.warn('Cannot persist to localStorage:', err);
        }

        // Update Success UI
        const successClientName = document.getElementById('successClientName');
        const successVoucherCode = document.getElementById('successVoucherCode');
        const successPhone = document.getElementById('successPhone');

        if (successClientName) successClientName.textContent = leadData.fullName;
        if (successVoucherCode) successVoucherCode.textContent = leadData.voucherCode;
        if (successPhone) successPhone.textContent = leadData.phone;

        // Transition form card to success card
        if (form) form.style.display = 'none';
        if (successCard) successCard.classList.add('is-visible');

        showToast('Đăng ký thành công! Stylist của IVY moda sẽ liên hệ với bạn trong ít phút.');

        // Scroll to card header
        if (formCard) {
          formCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 700);
    });
  }

  // ── 6. Copy Voucher Code Button ──
  const copyBtn = document.getElementById('copyVoucherBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeEl = document.getElementById('successVoucherCode');
      const code = codeEl ? codeEl.textContent.trim() : '';
      if (!code) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
          handleCopiedState();
        }).catch(() => {
          fallbackCopyText(code);
        });
      } else {
        fallbackCopyText(code);
      }
    });

    function handleCopiedState() {
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'ĐÃ SAO CHÉP ✓';
      copyBtn.style.color = '#27ae60';
      showToast('Đã sao chép mã ưu đãi vào khay nhớ tạm!');
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.color = '';
      }, 2500);
    }

    function fallbackCopyText(text) {
      const tempInput = document.createElement('input');
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      handleCopiedState();
    }
  }
});
