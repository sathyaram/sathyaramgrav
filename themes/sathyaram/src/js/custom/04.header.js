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
  // The wrapper for all planets
  var $planets = $space.find('.planets');
  // The wrapper for all shooting stars
  var $shootingStar = $space.find('.shooting-star');

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

    // Configuration for the planets moving from bottom to top
    planets: {
      // Available sizes of the planets in the background (weighted)
      // - prob:     The probability this planet size will be chosen
      // - minSpeed: Min time (ms) this size takes to travel across the screen
      // - maxSpeed: Max time (ms) this size takes to travel across the screen
      sizes: {
        // 16px planets
        16: { prob: 0.125, minSpeed: 60000, maxSpeed: 65000 },
        // 18px planets
        18: { prob: 0.125, minSpeed: 65000, maxSpeed: 70000 },
        // 20px planets
        20: { prob: 0.125, minSpeed: 70000, maxSpeed: 75000 },
        // 22px planets
        22: { prob: 0.125, minSpeed: 75000, maxSpeed: 80000 },
        // 24px planets
        24: { prob: 0.125, minSpeed: 80000, maxSpeed: 85000 },
        // 28px planets
        28: { prob: 0.125, minSpeed: 85000, maxSpeed: 90000 },
        // 32px planets
        32: { prob: 0.125, minSpeed: 90000, maxSpeed: 95000 },
        // 36px planets
        36: { prob: 0.125, minSpeed: 95000, maxSpeed: 100000 }
      },
      // Number of planets on the screen at given breakpoints
      number: {
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        x2: 3,
        x3: 3,
        x4: 4
      },
      // The available styles for planets
      styles: [
        // Blue
        {
          background: 'radial-gradient(ellipse at top left, #60c0f0 0%, #082838 100%)',
          boxShadow: '0 0 2em .5em rgba(96, 192, 240, .1), 0 0 .5em .0625em rgba(96, 192, 240, .2)'
        },
        // // Red
        // {
        //   background: 'radial-gradient(ellipse at top left, #ff665e 0%, #6b1f1b 100%)',
        //   boxShadow: '0 0 2em .5em rgba(255, 102, 94, .2), 0 0 .5em .0625px rgba(255, 102, 94, .4)'
        // },
        // // Yellow
        // {
        //   background: 'radial-gradient(ellipse at top left, #b7962a 0%, #56450c 100%)',
        //   boxShadow: '0 0 2em .5em rgba(183, 150, 42, .1), 0 0 .5em .0625px rgba(183, 150, 42, .2)'
        // },
        // // Green
        // {
        //   background: 'radial-gradient(ellipse at top left, #43a839 0%, #15510f 100%)',
        //   boxShadow: '0 0 2em .5em rgba(67, 168, 57, .1), 0 0 .5em .0625px rgba(67, 168, 57, .2)'
        // }
      ]
    },

    // Configuration for the shooting star
    shooting: {
      // The available background colors for shooting stars
      backgrounds: [
        'rgba(255, 255, 255, 0.4)', // White
        'rgba(239, 209, 255, 0.4)', // Purple
        'rgba(174, 193, 206, 0.4)', // Blue
        'rgba(255, 251, 193, 0.4)'  // Yellow
      ],
      // The amount (px) which the blurriness of the star's pieces increases
      // the further along the trail they are.
      blurStep: 1,
      // The easing applied to the shooting star when it moves from A to B
      // - The default jQuery easing 'swing' is being used, but..
      // - ..other available easings can be found here:
      //   - http://gsgd.co.uk/sandbox/jquery/easing/
      //   - https://easings.net/
      easing: 'easeInOutSine',
      // The minimum distance (%) the shooting star should move in either X or Y
      minDist: 6,
      // The maximum distance (%) the shooting star should move in either X or Y
      maxDist: 12,
      // The minimum time (ms) that should pass between shooting stars
      // - Intervals must be larger than the speeds.
      minInterval: 3000,
      // The maximum time (ms) that should pass between shooting stars
      // - Intervals must be larger than the speeds.
      maxInterval: 6000,
      // The minimum time (ms) the shooting star should take to get from A to B
      // - Speeds must be smaller than the intervals.
      minSpeed: 450,
      // The maximum time (ms) the shooting star should take to get from A to B
      // - Speeds must be smaller than the intervals.
      maxSpeed: 550,
      // The minimum width (px) that shooting stars should be
      minWidth: 4,
      // The maximum width (px) that shooting stars should be
      maxWidth: 8,
      // The minimum opacity (%) of the shooting star's last element
      // - The star itself is 100 and for each element in the star's trail,
      //   the opacity trends towards this value
      minOpacity: 0,
      // The proportion (%) of the shooting star's size the last element
      // in the motion trail should be ( 100% .. n .. minTrail% )
      minTrail: 50,
      // The number of elements in the star's motion trail (excl. star itself)
      numTrail: 20
    }

  };

  /**
   * The current 'state' of the header section
   */
  var state = {
    // The current CSS breakpoint the viewport falls into
    breakpoint: SR.util.breakpoint().name,
    // The positions of the shooting star and its motion trail
    positions: [],
    // The setTimeout IDs for the shooting star
    timers: {
      star: null,
      trail: null
    },
  };

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Run on page-load

  // Draw the regular stars on the background
  startStars();

  // Draw the planets on the background
  startPlanets();

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Event listeners

  // Listen for custom event on the header section to start the shooting star
  $header.on('space:start', function() {
    // Start the shooting start, but wait a bit in case the overlay is still up
    setTimeout(startShootingStar, SR.overlay.wait + SR.overlay.dur);
  });

  // Listen for custom event on the header section to stop the shooting star
  $header.on('space:stop', function() {
    // Stop the shooting star
    stopShootingStar();
    // Redraw the planets
    startPlanets();
  });

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

  // When the document undergoes a visibility change,
  // start/stop the shooting star functionality
  $(document).on(SR.util.getPageVisEvent(), function() {
    // If the tab has become hidden, stop the shooting star as most browsers
    // will thottle the timers when a page is out of focus which can mess up
    // the animation and lead to weird results. Better to stop and start it.
    if (document[SR.util.getPageVisProperty()]) {
      stopShootingStar();
    }
    // Only start the shooting star if currently viewing the header
    else if ($('body').hasClass('fp-viewing-home')) {
      startShootingStar();
    }
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions

  /**
   * Functionality that is run after all pieces of the shooting star have
   * stopped moving and faded out.
   *
   * @return {void}
   */
  function afterShootingStar() {
    //
  }

  /**
   * Generates a random background color for a shooting star, given the
   * available colors in the configuration object.
   *
   * @return {string}  The selected background color.
   */
  function getRandomBackground() {
    // Select a random number corresponding to the available array keys
    var selected = SR.util.randomInt(0, config.shooting.backgrounds.length - 1);
    // Return the selected color
    return config.shooting.backgrounds[selected];
  }

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
   * Generates a random distance for a shooting star to travel, given the
   * limits in the configuration object.
   *
   * @return {object}  An object representing how far the shooting star should
   *                   travel on either axis (%)
   *                   e.g. { x: 50, y: 50 }
   */
  function getRandomDistance() {
    // Generate a random direction for each axis for the shooting star to travel
    var xDir = SR.util.randomInt(0, 1) ? 1 : -1;
    var yDir = SR.util.randomInt(0, 1) ? 1 : -1;
    // Generate a random distance (%) for each axis for the shooting star to
    // travel. Include direction of travel by multiplying by values from above.
    var xDist = xDir * SR.util.randomInt(config.shooting.minDist, config.shooting.maxDist);
    var yDist = yDir * SR.util.randomInt(config.shooting.minDist, config.shooting.maxDist);
    // Return the generated distance
    return { x: xDist, y: yDist };
  }

  /**
   * Generates a random starting point for a shooting star, given the distance
   * that it is configured to travel. Removes an area from the outside of the
   * viewport equivalent to the distance, such that shooting stars start in a
   * position where they will never go off screen.
   *
   * @param {object} distance  The configured distance for the shooting star (%)
   *                           e.g. { x: 50, y: 50 }
   * @return {object}          The generated start co-ordinates (px)
   *                           e.g. { x: 500, y: 500 }
   */
  function getRandomShootingStarStart(distance) {
    // Get the viewport dimensions
    var vp = SR.util.viewport();
    // The distance is currently an integer representing a percentage.
    // Divide them by 100 to get a decimal representation.
    // Multiply the result of that by the viewport dimension to get the pixels.
    var xDist = vp.w * (distance.x / 100);
    var yDist = vp.h * (distance.y / 100);
    // Generate a random start co-ord given the distance calculated
    return {
      x: SR.util.randomInt(xDist, vp.w - xDist),
      y: SR.util.randomInt(yDist, vp.h - yDist)
    };
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
   * Generates a random style setup for a planet, given the available styles in
   * the configuration object.
   *
   * @return {object}  The select style object
   */
  function getRandomStyle() {
    // Select a random number corresponding to the available array keys
    var selected = SR.util.randomInt(0, config.planets.styles.length - 1);
    // Return the selected styles
    return config.planets.styles[selected];
  }

  /**
   * Generates a blur value for a piece in the shooting star, based on its
   * position in the star. The first element starts off with 0 blur and they
   * get increasingly more blurry towards the end of the motion trail, using
   * the blur step specified in the config.
   *
   * @param  {integer} i  The index of the star piece
   * @return {string}     The generated CSS filter value for the given piece
   */
  function getShootingStarBlur(i) {
    // Decide how many pixels to blur this piece
    var bpx = i * config.shooting.blurStep;
    // Return the full string for CSS
    return 'blur(' + bpx + 'px)';
  }

  /**
   * Generates an opacity for a piece in the shooting star, based on its
   * position in the star. The first element starts off at 100% opacity and they
   * get increasingly more transparent to the lower limit in the config.
   *
   * @param  {integer} i  The index of the star piece
   * @return {float}      The generated opacity for the given piece
   */
  function getShootingStarOpacity(i) {
    // The range (%) between the shooting star and the last element in the trail
    var range = 100 - config.shooting.minOpacity;
    // The percentage each element in the trail should reduce in opacity by
    var prop = range / config.shooting.numTrail;
    // Determine factor which we will multiply the opacity by, using the loop
    // index to get incrementally more transparent elements in the trail
    return 1 - (i * (prop / 100));
  }

  /**
   * Generates a <div> as a jQ object for each piece of the shooting star
   *
   * @return {object} A jQuery object representing the piece's <div>
   */
  function getShootingStarPiece() {
    return $('<div></div>');
  }

  /**
   * Generates the size for a piece in the shooting star, based on its
   * position in the star. The first element starts off at whole size and they
   * get increasingly smaller to the lower limit specified in the config.
   *
   * @param  {integer} size  The original size of the shooting star (px)
   * @param  {integer} i     The index of the star piece
   * @return {float}         The generated size for the given piece (px)
   */
  function getShootingStarSize(size, i) {
    // The range (%) between the shooting star and the last element in the trail
    var range = 100 - config.shooting.minTrail;
    // The percentage each element in the trail should reduce in size by
    var prop = range / config.shooting.numTrail;
    // Determine the factor which we will multiply the size by, using the loop
    // index to get incrementally smaller elements in the trail
    var factor = 1 - (i * (prop / 100));
    // Multiply the original size by the calculated factor
    return size * factor;
  }

  /**
   * Generates a <div> as a jQ object and sets the inline CSS properties
   * required to create the randomized effect we want.
   *
   * @return {object} A jQuery object representing the created planets's <div>
   */
  function getPlanet() {
    // Generate a random (weighted) width for the planet using our config
    var planetWidth = getRandomSize(config.planets);
    // Generate a random speed for the planet within our configured parameters
    var planetSpeed = getRandomSpeed(planetWidth, config.planets);
    // Generate a random delay for the planet given the speed
    var planetDelay = getRandomDelay(planetSpeed);
    // Generate a random CSS 'left' value to spread the planets out
    var planetLeft = SR.util.randomInt(0, SR.util.viewport().w);
    // Generate random styles for this planet to vary the colors
    var planetStyle = getRandomStyle();
    // Create the planet element, give it the randomized values and start the
    // animation. If we just set a random bottom value to stagger the planets,
    // then when the animation starts it simply jumps to the start of the
    // animation. Providing a negative value for the animation delay is what
    // allows us to start each planet at a random point in its animation cycle.
    return $('<div></div>').css({
      // Give the planet a random animation duration
      animationDuration: planetSpeed + 'ms',
      // Give the planet a random negative delay to randomize its vertical position
      animationDelay: (0 - planetDelay) + 'ms',
      // Start the animation (currently paused)
      animationPlayState: 'running',
      // Animation begins off the bottom of the screen
      bottom: '-40px',
      // Give the star a random horizontal position
      left: planetLeft + 'px',
      // Give the star a random width/height
      height: planetWidth + 'px',
      width: planetWidth + 'px',
      // Use the width/height for the font-size also so we can set a box-shadow
      // relative to the star's size using em units.
      fontSize: planetWidth + 'px',
      // Apply the random styles to the star
      background: planetStyle.background
    })
    .css('box-shadow', planetStyle.boxShadow);
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
    var starLeft = SR.util.randomInt(0, SR.util.viewport().w);
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
      left: starLeft + 'px',
      // Give the star a random width/height
      height: starWidth + 'px',
      width: starWidth + 'px',
      // Use the width/height for the font-size also so we can set a box-shadow
      // relative to the star's size using em units.
      fontSize: starWidth + 'px'
    });
  }

  /**
   * Given the starting co-ordinates (px) on one axis and the distances (%) its
   * meant to travel, returns the final co-ordinates (px) of the shooting star.
   *
   * We are treating the header section much like a regular graph. The viewport
   * width represents the x-axis and the viewport height represents the y-axis.
   * - For example, if the 'start' is 200(px) and the 'dist' is 20(%), given a
   *   viewport width/height of 1000px, the final position would be the starting
   *   position plus the given proportion of the viewport:
   *   - 200 + (0.2 * 1000) = 400
   *
   * @param {object} start     The starting position (px), e.g. { x: 0, y: 0 }
   * @param {object} distance  The proportion of the viewport to travel (%), e.g. { x: 0, y: 0 }
   * @return {object}          The resulting final position (px), e.g. { x: 0, y: 0 }
   */
  function getStarFinalPosition(start, distance) {
    return {
      x: start.x + ((distance.x / 100) * SR.util.viewport().w),
      y: start.y + ((distance.y / 100) * SR.util.viewport().h)
    };
  }

  /**
   * Determines whether a given piece of the shooting star has reached the final
   * destination of the shooting star.
   *
   * @param {object} $piece  The element in the motion trail, jQ selection
   * @param {object} dest    The final destination co-ords, e.g. { x: 0, y: 0 }
   * @return {boolean}       Whether the piece has reached the destination or not
   */
  function hasReachedEnd($piece, dest) {
    var xReachedEnd = Math.floor(parseFloat($piece.css('left'))) == Math.floor(dest.x);
    var yReachedEnd = Math.floor(parseFloat($piece.css('bottom'))) == Math.floor(dest.y);
    return xReachedEnd && yReachedEnd;
  }

  /**
   * Given co-ordinates for the current position of the shooting star, updates
   * the state with the new position and removes the oldest position from the
   * state.
   *
   * @param {integer} x  The horizontal position (px) of the shooting star
   * @param {integer} y  The vertical position (px) of the shooting star
   * @return {void}
   */
  function saveShootingStarPosition(x, y) {
    // Add the new position to the state array
    state.positions.push({ x:x, y:y });
    // Get rid of the first item in the state array
    // Only necessary if the number of saved positions exceeds the trail length
    if (state.positions.length > config.shooting.numTrail) {
      state.positions.shift();
    }
  }

  /**
   * Determines whether the shooting star is still moving. The shooting star is
   * considered to still be running until the last element in the motion trail
   * has reached the final destination.
   *
   * @param {object} $last  The last element in the motion trail, jQ selection
   * @param {object} dest   The final destination co-ords, e.g. { x: 0, y: 0 }
   * @return {boolean}      Whether the shooting star is still running or not
   */
  function shootingStarIsRunning($last, dest) {
    return !hasReachedEnd($last, dest);
  }

  /**
   * Draws the planets in the available area
   *
   * @return {void}
   */
  function startPlanets() {
    // Delete any planets that already exist
    $planets.children().remove();
    // Determine how many planets to draw
    var numPlanets = config.planets.number[ state.breakpoint ];
    // Generate the planets
    for (var i = 0; i < numPlanets; i++) {
      // Generate a new planet with random properties
      var $planet = getPlanet();
      // Insert the planet into the document
      $planet.appendTo($planets);
    }
  }

  /**
   * Starts the shooting star functionality. Once a shooting star has completed,
   * it waits a random amount of time and calls this function again.
   *
   * We don't really need any responsive functionality here because it takes
   * into account the viewport size each time a new shooting star is started.
   *
   * Utilises concepts from this article:
   * - https://www.kirupa.com/canvas/creating_motion_trails.htm
   *
   * @return {void}
   */
  function startShootingStar() {
    // Delete any shooting stars that already exist
    $shootingStar.children().remove();
    // Reset the state
    state.positions = [];
    // Generate a random time (ms) to delay execution for.
    var delay = SR.util.randomInt(config.shooting.minInterval, config.shooting.maxInterval);
    // Generate a random size (px) for the shooting star.
    var size = SR.util.randomInt(config.shooting.minWidth, config.shooting.maxWidth);
    // Generate a random speed (ms) for the shooting star.
    var speed = SR.util.randomInt(config.shooting.minSpeed, config.shooting.maxSpeed);
    // Generate a random background color for the shooting star.
    var background = getRandomBackground();
    // Generate a random distance (%) for each axis for the shooting star to
    // travel. Alternate direction of travel by using negative numbers.
    var distance = getRandomDistance();
    // Generate a random starting position (px) for the shooting star.
    // - Take into account the travel distance and only select positions that
    //   are at least the travel distance away from the edge, so the shooting
    //   star is always visisble.
    var start = getRandomShootingStarStart(distance);
    // Calculate the final position (px) for the shooting star.
    var final = getStarFinalPosition(start, distance);
    // For each element of the star's trail + 1 (<=) for the star itself
    // - First one, 0, is the star itself
    // - The rest are the trail that gets progressively smaller/transparent
    for (var i = 0; i <= config.shooting.numTrail; i++) {
      // Don't need to do this for the first element
      // All pieces begin in the starting position - reflect this in the state
      if (i > 0) state.positions.push({ x: start.x, y: start.y });
      // Create the star piece
      var $piece = getShootingStarPiece();
      // Apply styles to the piece
      $piece.css({
        // Place the piece in the starting position
        left: start.x + 'px',
        bottom: start.y + 'px',
        // Give the piece the random background we generated
        background: background,
        // Give the piece the random size we generated above
        width: getShootingStarSize(size, i) + 'px',
        height: getShootingStarSize(size, i) + 'px',
        // Give the pieces progressively more transparent opacities
        opacity: getShootingStarOpacity(i),
        // Give the pieces progressively more blur
        filter: getShootingStarBlur(i)
      });
      // Insert the piece into the scene
      $piece.appendTo($shootingStar);
    }
    // Get all pieces of the shooting star
    var $pieces = $shootingStar.find('> div');
    var $first  = $pieces.first();
    var $rest   = $pieces.slice(1);
    // Animate the opacity on the wrapper so we don't have to
    // do any maths with the star element's varied opacities
    $shootingStar
      .css({ opacity: 0 })
      .animate({ opacity: 1 }, speed, 'swing');
    // Start animating the shooting star (first element) to the final position
    $first.animate(
      { left: final.x+'px', bottom: final.y+'px' },
      speed,
      config.shooting.easing,
      // When the star has finished moving, explode it
      function() {
        $first.addClass('explode');
      }
    );
    // Trigger the elements in the motion trail to start following the first
    updateShootingStarTrail($first, $rest, { x: final.x, y: final.y });
    // Wait a random amount of time before calling this function again.
    // Save a reference to the timer so we can clear it later if we want to.
    state.timers.star = setTimeout(startShootingStar, delay);
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

  /**
   * Stops the shooting star animation loop, useful for when out of focus
   *
   * @return {void}
   */
  function stopShootingStar() {
    // Delete all elements from the wrapper
    $shootingStar.children().remove();
    // Clear the timers
    clearTimeout(state.timers.star);
    clearTimeout(state.timers.trail);
    // Reset the state
    state.positions = [];
    state.timers.star = null;
    state.timers.trail = null;
  }

  /**
   * Called every 5ms whilst the shooting star is animating, to track its
   * position and update the motion trail to follow just behind it.
   *
   * @param {object} $first  The first element in the shooting star, jQ selection
   * @param {object} $rest   The other elements in the shooting star, jQ selection
   * @param {object} dest    An object representing the final destination
   *                         e.g. { x: 0, y: 0 }
   * @return {void}
   */
  function updateShootingStarTrail($first, $rest, dest) {
    // Determine where the first element currently is
    var fx = parseFloat($first.css('left'));
    var fy = parseFloat($first.css('bottom'));
    // Update our list of positions
    saveShootingStarPosition(fx, fy);
    // Apply the updated positions to the elements in the trail
    for (var i = 0; i < config.shooting.numTrail; i++) {
      // Isolate the position we're using
      var position = state.positions[i];
      // Isolate the piece we're using
      var $piece = $rest.eq(config.shooting.numTrail - (i + 1));
      // Move it
      $piece.css({
        left: position.x + 'px',
        bottom: position.y + 'px'
      });
      // If this piece has reached the final position, explode it
      if (hasReachedEnd($piece, dest)) {
        $piece.addClass('explode');
      }
    }
    // Keep running this function until the animation is over
    if (shootingStarIsRunning($rest.last(), dest)) {
      // Was going to use requestAnimationFrame but since thats likely to be
      // 60 times a second, which equates to one frame every 16.7ms, use
      // setTimeout so we can run this function every 5ms instead.
      state.timers.trail = setTimeout(function() {
        updateShootingStarTrail($first, $rest, dest);
      }, 5);
    }
    // The animation is over, run our cleanup
    else afterShootingStar();
  }

});
