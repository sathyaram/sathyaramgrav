/**
 * Helpers used throughout our JavaScript
 * (Save helpers to the global SathyaRam object to prevent global ns pollution)
 * Copyright 2018 Sathya Ram
 */
SR.util = {

  /**
   * Determines which breakpoint the viewport currently falls into
   *
   * @return {object} An object representing the current breakpoint
   *                  e.g. { name: 'lg', px: 1280 }
   */
  breakpoint: function() {
    // Get the viewport dimensions
    var bp, vp = this.viewport();
    // Determine which breakpoint we're working with
    if      (vp.w >= SR.breakpoints.x4) bp = 'x4';
    else if (vp.w >= SR.breakpoints.x3) bp = 'x3';
    else if (vp.w >= SR.breakpoints.x2) bp = 'x2';
    else if (vp.w >= SR.breakpoints.xl) bp = 'xl';
    else if (vp.w >= SR.breakpoints.lg) bp = 'lg';
    else if (vp.w >= SR.breakpoints.md) bp = 'md';
    else if (vp.w >= SR.breakpoints.sm) bp = 'sm';
    else                                bp = 'xs';
    return { name: bp, px: SR.breakpoints[bp] };
  },

  /**
   *
   */
  disableFullPage: function() {
    $.fn.fullpage.setAutoScrolling(false);
    $.fn.fullpage.setAllowScrolling(false);
    $.fn.fullpage.setKeyboardScrolling(false);
    $('body').css('overflow', 'hidden');
  },

  /**
   *
   */
  enableFullPage: function() {
    $.fn.fullpage.setAutoScrolling(true);
    $.fn.fullpage.setAllowScrolling(true);
    $.fn.fullpage.setKeyboardScrolling(true);
    $('body').css('overflow', 'auto');
  },

  /**
   * Returns the event name we need to use to listen for updates when making
   * use of the Page Visibility API.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
   *
   * @return {string|null}  The correct property or null
   */
  getPageVisEvent: function() {
    // Opera 12.10 and Firefox 18 and later support
    if      (typeof document.hidden !== 'undefined')       return 'visibilitychange';
    else if (typeof document.msHidden !== 'undefined')     return 'msvisibilitychange';
    else if (typeof document.webkitHidden !== 'undefined') return 'webkitvisibilitychange';
    else return null;
  },

  /**
   * Returns the property on the document that we are looking for
   * when making use of the Page Visibility API.
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
   *
   * @return {string|null}  The correct property or null
   */
  getPageVisProperty: function() {
    // Opera 12.10 and Firefox 18 and later support
    if      (typeof document.hidden !== 'undefined')       return 'hidden';
    else if (typeof document.msHidden !== 'undefined')     return 'msHidden';
    else if (typeof document.webkitHidden !== 'undefined') return 'webkitHidden';
    else return null;
  },

  /**
   * Gets a random integer between two values, inclusive
   * > https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
   *
   * @param  {integer} min  The minimum possible value for the random number
   * @param  {integer} max  The maximum possible value for the random number
   * @return {integer}      A random number within the provided range
   */
  randomInt: function(min, max) {
    // Ensure we have integers
    min = Math.ceil(min);
    max = Math.floor(max);
    // Generate and return the random number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  /**
   * Gets the viewport width and height
   * > https://stackoverflow.com/a/8876069/3389737
   *
   * @return {object} An object representing the current viewport dimensions
   *                  e.g. { w: 1276, h: 917 }
   */
  viewport: function() {
    return {
      w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
  }

};

$(document).ready(function() {

  var $photography = $('#photography');
  var $grid = $photography.find('.grid');

  // Lazy load all images with data-src attribute
  $('img[data-src]').Lazy({
    effect: 'fadeIn',
    afterLoad: function(elem) {
      $grid.isotope('layout');
    }
  });

  // Lazy-load the background images for articles
  $('section > .wrapper > article').Lazy({
    effect: 'fadeIn'
  });

});

/**
 * Handles fading out the loading spinner when you first hit the page
 */

$(document).ready(function() {

  // Relevant elements
  var $overlay  = $('#overlay');
  var $logoOver = $('#loader img');
  var $logoHead = $('#_home .logo');

  // Get the location of the header's logo
  var newTop = $logoHead.css('top');
  // Hide the header's logo
  $logoHead.css('opacity', '0');
  // Wait until the logo is done spinning
  $logoOver.on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
    // Fade out the rest of the overlay
    $overlay.addClass('transparent');
    // Move the logo to the same position as the header's logo
    $logoOver.animate({ top: newTop }, SR.overlay.dur, 'swing', function() {
      // Switch the logos
      $logoHead.css('opacity', '1');
      $overlay.hide();
    });
  });

});

/**
 * Space functionality for the Header section
 * Copyright 2018 Sathya Ram
 *
 * Relevant links:
 * - https://stackoverflow.com/a/8876069/3389737
 * - https://stackoverflow.com/a/8435261/3389737
 * - https://www.kirupa.com/canvas/creating_motion_trails.htm
 * - https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 */

$(document).ready(function() {

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Relevant Elements

  // The slide itself
  var $header = $('header');
  // The wrapper for all space elements
  var $space = $header.find('.space');
  // The wrapper for all regular stars
  var $stars = $space.find('.stars');

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Configuration

  var config = {

    // Configuration for the stars moving from the bottom to the top
    stars: {
      // Available sizes of the stars in the background (weighted)
      // - prob:     The probability this star size will be chosen
      // - minSpeed: Min time (ms) this size takes to travel across the screen
      // - maxSpeed: Max time (ms) this size takes to travel across the screen
      sizes: {
        // 1px stars
        1: { prob: 0.5, minSpeed: 20000, maxSpeed: 30000 },
        // 2px stars
        2: { prob: 0.4, minSpeed: 30000, maxSpeed: 40000 },
        // 3px stars
        3: { prob: 0.05, minSpeed: 40000, maxSpeed: 50000 },
        // 4px stars
        4: { prob: 0.05, minSpeed: 50000, maxSpeed: 60000 }
      },
      // Number of stars on the screen at given breakpoints
      number: {
        xs: 100,
        sm: 130,
        md: 165,
        lg: 200,
        xl: 240,
        x2: 280,
        x3: 325,
        x4: 370
      }
    },

  };

  /**
   * The current 'state' of the header section
   */
  var state = {
    // The current CSS breakpoint the viewport falls into
    breakpoint: SR.util.breakpoint().name
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Run on page-load

  // Draw the regular stars on the background
  startStars();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Event listeners

  // When the viewport size changes, update the scene
  $(window).resize(function() {
    // If the viewport has changed
    if (state.breakpoint != SR.util.breakpoint().name) {
      // Redraw the regular stars
      startStars();
      // Update the breakpoint in the state
      state.breakpoint = SR.util.breakpoint().name;
    }
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions

  /**
   * Generates a random position somewhere along the star/planet's animation
   * cycle, so all the stars/planets are spread across the page on page load.
   *
   * @param {integer} speed  The speed of the star/planet (ms)
   * @return {integer}       The generated delay (ms)
   */
  function getRandomDelay(speed) {
    return SR.util.randomInt(0, speed);
  }

  /**
   * Gets a random size for a star or planet from their configuration, taking
   * into consideration their specified weighting.
   * > https://stackoverflow.com/a/8435261/3389737
   *
   * @param {object} _config  The config for the chosen thing, stars or planets
   * @return {integer}        A random star/planet size (px)
   */
  function getRandomSize(_config) {
    // To keep a running total of the probabilites in the loop
    var sum = 0;
    // The random number we're using for selection
    var rand = Math.random();
    // Loop the available sizes and their weights
    for (size in _config.sizes) {
      // Add the probability of the current size to the running total
      sum += _config.sizes[size].prob;
      // This is where the weighting comes into play. The random number will be
      // a decimal between 0 and 1. The probabilites add up to 1. Looping
      // through them and comparing the random number to the running total
      // of probabilities gives us a random size with a weighted probability.
      // If the probabilites configured above have a total greater than 1, the
      // weightings will be off. If it is less than 1, a size cant be chosen.
      if (rand <= sum) return size;
    }
  }

  /**
   * Generates a random speed for a star or planet, using the configured minimum
   * and maximum speeds for the given star size.
   *
   * @param {integer} size    The size of the star (px)
   * @param {object} _config  The config for the chosen thing, stars or planets
   * @return {integer}        The generated speed (ms)
   */
  function getRandomSpeed(size, _config) {
    return SR.util.randomInt(
      _config.sizes[size].minSpeed,
      _config.sizes[size].maxSpeed
    );
  }

  /**
   * Generates a <div> as a jQ object and sets the inline CSS properties
   * required to create the randomized effect we want.
   *
   * @return {object} A jQuery object representing the created star's <div>
   */
  function getStar() {
    // Generate a random (weighted) width for the star using our config
    var starWidth = getRandomSize(config.stars);
    // Generate a random speed for the star within our configured parameters
    var starSpeed = getRandomSpeed(starWidth, config.stars);
    // Generate a random delay for the star given the speed
    var starDelay = getRandomDelay(starSpeed);
    // Generate a random CSS 'left' value to spread the stars out
    var starLeft = SR.util.randomInt(0, 10000);
    // Create the star element, give it the randomized values and start the
    // animation. If we just set a random bottom value to stagger the stars,
    // then when the animation starts it simply jumps to the start of the
    // animation. Providing a negative value for the animation delay is what
    // allows us to start each star at a random point in its animation cycle.
    return $('<div></div>').css({
      // Give the star a random animation duration
      animationDuration: starSpeed + 'ms',
      // Give the star a random negative delay to randomize its vertical position
      animationDelay: (0 - starDelay) + 'ms',
      // Start the animation (currently paused)
      animationPlayState: 'running',
      // Animation begins off the bottom of the screen
      bottom: '-10px',
      // Give the star a random horizontal position
      left: (starLeft / 100) + '%',
      // Give the star a random width/height
      height: starWidth + 'px',
      width: starWidth + 'px',
      // Use the width/height for the font-size also so we can set a box-shadow
      // relative to the star's size using em units.
      fontSize: starWidth + 'px'
    });
  }

  /**
   * Draws the regular stars in the available area
   *
   * @return {void}
   */
  function startStars() {
    // Delete any stars that already exist
    $stars.children().remove();
    // Determine how many stars to draw
    var numStars = config.stars.number[ state.breakpoint ];
    // Generate the stars
    for (var i = 0; i < numStars; i++) {
      // Generate a new star with random properties
      var $star = getStar();
      // Insert the star into the document
      $star.appendTo($stars);
    }
  }

});

$(document).ready(function() {

  var $photography = $('#photography');
  var $grid = $photography.find('.grid');
  var $filters = $photography.find('ul').find('li');

  // Set up the Isotope/Masonry grid
  $grid.isotope({
    itemSelector: '.item',
    percentPosition: true,
    filter: '.featured',
    masonry: {
      columnWidth: '.sizer',
    },
  });

  // Trigger a redraw when images have loaded to prevent broken layouts
  $grid.imagesLoaded().progress(function() {
    $grid.isotope('layout');
  });

  // When a filter is clicked, update everything
  $filters.click(function(e) {
    var $filter = $(this);
    // Get the class name to filter by
    var filter = $filter.data('filter');
    // Apply the filter to the grid
    $grid.isotope({ filter: filter });
    // Update the classes on the filters
    $filters.removeClass('active');
    $filter.addClass('active');
  });

  // Initialize LightGallery on the photo grid
  $grid.lightGallery({
    animateThumb: true,
    autoplay: false,
    cssEasing: 'ease',
    currentPagerPosition: 'middle',
    download: false,
    easing: 'swing',
    fullscreen: true,
    hash: false,
    mode: 'lg-zoom-in-out', // http://sachinchoolur.github.io/lightGallery/demos/transitions.html
    pullCaptionUp: true,
    selector: 'a',
    share: false,
    speed: 600,
    showThumbByDefault: true,
    thumbnail: true,
    thumbContHeight: 100,
    thumbWidth: 100,
    thumbHeight: '80px',
    thumbMargin: 5,
    toogleThumb: true,
    zoom: true
  });

});

$(document).ready(function() {

  // Obtain an instance of the library
  // - Set default options
  var SR = ScrollReveal({
    delay: 0,
    distance: '10%',
    duration: 500,
    easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
    opacity: 0,
    origin: 'bottom',
    reset: false,
    scale: 1,
    viewFactor: 0.35
  });

  // Animate the text in the header
  SR.reveal('header .content div', {
    distance: '50%',
    scale: 0.85
  });
  SR.reveal('header .content nav', {
    distance: '50%',
    delay: 500,
    origin: 'top',
    scale: 0.85
  });

  // Animate the three services
  SR.reveal('#services > nav > a', {});

  // Animate the section titles
  SR.reveal('section > h1', {
    distance: '25%',
    origin: 'left',
    viewFactor: 1
  });

  // Animate the full-width section articles
  SR.reveal('section > .wrapper > article.full-width', {
    viewFactor: 0.5
  });
  // Animate the regular section articles
  SR.reveal('section > .wrapper > article:not(.full-width)', {
    viewFactor: 0.5
  });

  // Animate the filter list in the photography section
  // - Stagger the animations by 100ms each
  SR.reveal('#photography li', {
    origin: 'left'
  }, 250);

});

