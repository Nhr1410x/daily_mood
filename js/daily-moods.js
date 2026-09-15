/**
 * Daily Moods — Tab switching with crossfade
 * Switches between Morning / City / Slow mood panels
 */
(function () {
  'use strict';

  var tabs = document.querySelectorAll('.mood-tab');
  var panels = document.querySelectorAll('.mood-panel');

  if (!tabs.length || !panels.length) return;

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var target = this.getAttribute('data-mood');

      // Update active tab
      tabs.forEach(function (t) {
        t.classList.remove('is-active');
      });
      this.classList.add('is-active');

      // Crossfade panels
      panels.forEach(function (panel) {
        if (panel.getAttribute('data-mood') === target) {
          panel.classList.add('is-active');
        } else {
          panel.classList.remove('is-active');
        }
      });
    });
  });

  // Keyboard accessibility
  var tabList = document.querySelector('.mood-tabs');
  if (tabList) {
    tabList.addEventListener('keydown', function (e) {
      var tabArray = Array.from(tabs);
      var currentIndex = tabArray.indexOf(document.activeElement);

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        var next = (currentIndex + 1) % tabArray.length;
        tabArray[next].focus();
        tabArray[next].click();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        var prev = (currentIndex - 1 + tabArray.length) % tabArray.length;
        tabArray[prev].focus();
        tabArray[prev].click();
      }
    });
  }
})();
