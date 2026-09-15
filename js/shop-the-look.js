/**
 * Shop The Look — Hotspot interactions
 * Click hotspot → show product popup
 * Click outside → dismiss
 */
(function () {
  'use strict';

  var hotspots = document.querySelectorAll('.hotspot');

  if (!hotspots.length) return;

  function closeAllHotspots() {
    hotspots.forEach(function (hs) {
      hs.classList.remove('is-active');
    });
  }

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener('click', function (e) {
      e.stopPropagation();
      var isActive = this.classList.contains('is-active');
      closeAllHotspots();
      if (!isActive) {
        this.classList.add('is-active');
      }
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.hotspot')) {
      closeAllHotspots();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllHotspots();
    }
  });
})();
