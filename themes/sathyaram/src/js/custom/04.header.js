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
  var $header = $('#_home');
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
