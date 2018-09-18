/**
 * Handles fading out the loading spinner when you first hit the page
 */

$(document).ready(function() {

  // Relevant elements
  var $overlay  = $('#overlay');
  var $logoOver = $('#loader img');
  var $logoHead = $('main > header .logo');

  // Wait for the page to settle in
  setTimeout(function() {
    // Get rid of the overlay
    $overlay.addClass('gone');
  }, 2000);

});
