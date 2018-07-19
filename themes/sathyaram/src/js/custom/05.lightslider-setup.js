/**
 * Handles all functionality for setting up lightSlider
 * https://github.com/sachinchoolur/lightslider
 */

$(document).ready(function() {

  // Select all of the light sliders
  var $sliders = $('.light-slider');

  // Set up a generic light slider configuration
  $sliders.lightSlider({
    // Type of transition 'slide' and 'fade'
    mode: 'fade',
    // How many items to show at once
    item: 1,
    // How many items to move when sliding
    slideMove: 1,
    // The margin between slides
    slideMargin: 0,
    // The speed for the slide animation (ms)
    speed: 600,
    // Autoplay the slides
    auto: true,
    // Pause autoplay on hover
    pauseOnHover: true,
    // Loop the slides
    loop: true,
    // How long to show each slide when autoplaying
    pause: 4000,
    // Disable keyboard interaction
    keyPress: false,
    // Show prev/next controls
    controls: true,
    // Disable dots/pager
    pager: false,
    // Disable gallery
    gallery: false
  });

});
