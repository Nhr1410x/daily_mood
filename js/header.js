/**
 * Header — Sticky header with scroll detection
 * Transparent → white background on scroll
 * Mobile hamburger menu toggle
 */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.querySelector('.mobile-nav');
  var scrollThreshold = 50;

  if (!header) return;

  // Scroll detection
  var lastScrollY = 0;
  var ticking = false;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        if (lastScrollY > scrollThreshold) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial check

  // Mobile menu toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('is-active');
      mobileNav.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';

      // Ensure header looks correct when mobile nav is open
      if (isOpen) {
        header.classList.add('is-scrolled');
      } else if (window.scrollY <= scrollThreshold) {
        header.classList.remove('is-scrolled');
      }
    });

    // Close mobile nav when clicking links
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('is-active');
        mobileNav.classList.remove('is-open');
        document.body.style.overflow = '';
        if (window.scrollY <= scrollThreshold) {
          header.classList.remove('is-scrolled');
        }
      });
    });
  }
})();
