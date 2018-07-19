/**
 * Handles all functionality for slider's galleries
 */

$(document).ready(function() {

  // The elements which will be galleries
  var $galleries = $('ul.light-gallery');

  // Initialize the galleries
  $galleries.lightGallery({
    // Default library options
    counter: true,
    loop: true,
    mode: 'lg-slide',
    mousewheel: false,
    // Thumbnail plugin
    thumbnail: true,
    animateThumb: true,
    currentPagerPosition: 'middle',
    thumbWidth: 100,
    thumbContHeight: 100,
    thumbMargin: 0,
    showThumbByDefault: true,
    toogleThumb: false
  });

  // Fired immediately before the start opening.
  $galleries.on('onBeforeOpen.lg', function(event) {
    // When the gallery opens, disable all of the fullPage functionality
    SR.util.disableFullPage();
  });

  // Fired immediately before the start of the close process.
  $galleries.on('onBeforeClose.lg', function(event) {
    // When the gallery closes, re-enable all of the fullPage functionality
    SR.util.enableFullPage();
  });

});
