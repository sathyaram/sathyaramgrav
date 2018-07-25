/**
 * Handles fading out the loading spinner when you first hit the page
 */

$(document).ready(function() {

  // Relevant elements
  var $overlay  = $('#overlay');
  var $logoOver = $('#loader img');
  var $logoHead = $('main > header .logo');

  // Get the location of the header's logo
  var newTop = $logoHead.css('top');
  // Hide the header's logo
  $logoHead.css('opacity', '0');
  // Wait until the logo is done spinning
  $logoOver.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    // Fade out the rest of the overlay
    $overlay.addClass('transparent');
    // If we're at the very top of the page, animate the logo to the same
    // position as the header's logo
    if ($(window).scrollTop() === 0) {
      // Move the logo to the same position as the header's logo
      $logoOver.animate({ top: newTop }, SR.overlay.dur, 'swing', function() {
        // Switch the logos
        $logoHead.css('opacity', '1');
        $overlay.fadeOut();
      });
    } else {
      // Switch the logos
      $logoHead.css('opacity', '1');
      $overlay.fadeOut();
    }
  });

});
