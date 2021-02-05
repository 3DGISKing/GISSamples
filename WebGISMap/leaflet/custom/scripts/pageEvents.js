/* 
 * This document houses any events that need to be added to the
 * website. Please use comments to label what you're working with.
 * 
 * Please wrap your JS in an IIFE to keep the global scope clean.
 * https://developer.mozilla.org/en-US/docs/Glossary/IIFE
 */

// Modal Handler
(function () {
  var openModalButtons = document.getElementsByClassName('open-modal');
  var closeModalButtons = document.getElementsByClassName('close-modal');
  var modals = document.getElementsByClassName('modal');
  var modalBg = document.getElementsByClassName('modal__bg');

  // Searches the given Array for the given key attribute.
  function findKey(arr, key) {
    if (arr && key) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].attributes.key.value === key) {
          return arr[i];
        }
      }
    } else {
      return null;
    }
  }

  // Searches the given Array for the given Classname
  function removeClassFromArray(arr, className) {
    if (arr && className) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].classList.contains(className)) {
          arr[i].classList.remove(className)
        }
      }
    }
  }

  if (openModalButtons.length > 0
      && closeModalButtons.length > 0
      && modals.length > 0
      && modalBg.length > 0) {

    // Open event for each button
    for (var i = 0; i < openModalButtons.length; i++) {
      openModalButtons[i].addEventListener('click', function(e) {
        removeClassFromArray(modals, 'is-active');
        var modal = findKey(modals, e.target.attributes.key.value);
        modal.classList.add('is-active');
        modalBg[0].classList.add('is-active');
      });
    }

    // Close event for button in each modal
    for (var i = 0; i < closeModalButtons.length; i++) {
      closeModalButtons[i].addEventListener('click', function(e) {
        var modal = findKey(modals, e.target.attributes.key.value);
        modal.classList.remove('is-active');
        modalBg[0].classList.remove('is-active');
      });
    }

    // Close event for the modal background
    modalBg[0].addEventListener('click', function() {
      for (var i = 0; i < modals.length; i++) {
        if (modals[i].classList.contains('is-active')) {
          modals[i].classList.remove('is-active');
          modalBg[0].classList.remove('is-active');
        }
      }
    });
  }
})();
