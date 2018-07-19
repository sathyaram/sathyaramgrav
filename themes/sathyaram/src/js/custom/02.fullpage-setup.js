/**
 * Handles all functionality for setting up FullPage
 * https://github.com/alvarotrigo/fullPage.js
 *
 * Copyright 2018 Sathya Ram
 */

$(document).ready(function() {

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Relevant Elements

  // The main container fullPage will be initialised on
  var $main = $('main');
  // The header section
  var $header = $('#_home');
  // The slider sections
  var $sliders = $('#_web, #_graphic, #_photography');

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Configuration

  // Sections that have horizontal sliders
  var sliders = [3, 4, 5];

  // Initialize fullPage on the main element
  // https://github.com/alvarotrigo/fullPage.js#options
  $main.fullpage({
    // Options
    anchors: ['home', 'services', 'web', 'graphic', 'photography', 'contact-me'],
    animateAnchor: false,
    controlArrows: true,
    css3: true,
    easingcss3: 'cubic-bezier(0.645, 0.045, 0.355, 1.000)',
    fixedElements: null,
    keyboardScrolling: true,
    lazyLoading: true,
    paddingBottom: 0,
    paddingTop: 0,
    recordHistory: true,
    responsiveWidth: 768,
    responsiveHeight: 0,
    scrollOverflow: true,
    scrollBar: true,
    scrollingSpeed: 600,
    touchSensitivity: 50,
    verticalCentered: true,
    // Events
    afterLoad: doAfterLoad,
    onSlideLeave: doOnSlideLeave
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Run on page-load

  // Pre-load all of the next/prev images
  $sliders.each(function(index) {
    var $self = $(this);
    // Get all of the slides in this section
    var $slides = $self.find('.fp-slides article.slide');
    // Work out which slide is active
    var slideIndex = $self.find('.menu .active').index();
    // Update the next/prev buttons for the slide
    updateSliderButtons(slideIndex, $slides);
  });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Functions

  /**
   * Event handler for the 'afterLoad' event. Fired once the sections have been
   * loaded, after the scrolling has ended.

   * @param  {string}  anchorLink  anchorLink corresponding to the section.
   * @param  {integer} index       index of the section. Starting from 1.
   * @return {void}
   */
  function doAfterLoad(anchorLink, index) {
    // Start/stop the header section animations based on the section
    $header.trigger('space:' + (anchorLink === 'home' ? 'start' : 'stop'));
    // Get the section that was loaded
    var $loadedSection = $(this);
    // Only necessary on sections with sliders
    if (isSliderSection(index)) {
      // Get all of the slides
      var $slides = $loadedSection.find('.fp-slides article.slide');
      // Work out which slide is active
      var slideIndex = $loadedSection.find('.menu .active').index();
      // Update the next/prev buttons for the slide
      updateSliderButtons(slideIndex, $slides);
    }
  }

  /**
   * Event handler for the 'onSlideLeave' event. Fired once the user leaves a
   * slide to go to another, in the transition to the new slide. Returning false
   * will cancel the move before it happens.

   * @param  {string}  anchorLink      anchorLink corresponding to the section
   * @param  {integer} index           index of the section. Starting from 1
   * @param  {integer} slideIndex      index of the slide. Starting from 0
   * @param  {string}  direction       right/left depending on scroll direction
   * @param  {integer} nextSlideIndex  index of destination slide. Starts from 0
   * @return {void}
   */
  function doOnSlideLeave(anchorLink, index, slideIndex, direction, nextSlideIndex) {
    // Get the slide that is leaving
    var $leavingSlide = $(this);
    // Get the slider's section
    var $section = $leavingSlide.closest('section');
    // When a slide leaves, update the menu for that slider
    // Only necessary on sections with sliders
    if (isSliderSection(index)) {
      // Update the menu at the bottom
      updateSliderNavigation($section, nextSlideIndex);
      // Get all of the slides in the next slide
      var $slides = $leavingSlide.parent().find('article');
      // Update the next/prev buttons for the slide
      updateSliderButtons(nextSlideIndex, $slides);
    }
  }

  /**
   * Takes the current slide index and uses it to find the next/previous slides
   * that are adjacent and return them as jQuery selections.
   *
   * @param  {integer} index   index of the slide. Starting from 0
   * @param  {object} $slides  jQuery selection of available slides
   * @return {object}          An object with both elements as jQ selections:
   *                           e.g. { prev: $('elem'), next: $('elem') }
   */
  function getAdjacentSlides(index, $slides) {
    var prevIndex, nextIndex;
    // Work out the indexes of the slides either side of this one
    // Has to consider whether we are at the end and select from the other end
    if (index === 0) {
      // If its the first slide, we need to grab the last slide for previous
      prevIndex = $slides.length - 1;
      nextIndex = 1;
    } else if (index === $slides.length - 1) {
      // If its the last slide, we need to grab the first slide for next
      prevIndex = index - 1;
      nextIndex = 0;
    } else {
      // Its in the middle so we can just +/-1 from the index
      prevIndex = index - 1;
      nextIndex = index + 1;
    }
    // Get the previous and next slides
    var $prevSlide = $slides.eq(prevIndex);
    var $nextSlide = $slides.eq(nextIndex);
    // Return the slides
    return {
      prev: $prevSlide,
      next: $nextSlide
    };
  }

  /**
   * Gets the first image in a given horizontal slide
   *
   * @param  {object} $slide  The slide as a jQuery selection
   * @return {string}         The URL of the first image in the slide
   */
  function getSlideImage($slide) {
    // Get the first image
    var $img = $slide.find('.screen img').first();
    // It might be in the data-src attribute if it hasn't been loaded yet
    return $img.attr('data-src') ? $img.attr('data-src') : $img.attr('src');
  }

  /**
   * Hides the next/previous buttons for the given section by applying the
   * appropriate CSS class.
   *
   * @param  {object} $section  The chosen section as a jQuery selection
   * @return {void}
   */
  function hideSliderButtons($section) {
    // Hide the buttons for this slider
    $section.find('.fp-controlArrow').removeClass('show');
  }

  /**
   * Determines if the given section's index is in our configured list of
   * sections that contain horizontal sliders.
   *
   * @param  {integer} index  The index of the section to check
   * @return {Boolean}        Whether the given section was a slider section
   */
  function isSliderSection(index) {
    return sliders.includes(index);
  }

  /**
   * Updates the preview images in the previous and next buttons either side
   * of the horizontal sliders.
   *
   * @param  {integer} slideIndex  index of the slide. Starting from 0
   * @param  {object}  $slides     jQuery selection of available slides
   * @return {void}
   */
  function updateSliderButtons(slideIndex, $slides) {
    // Get the adjacent slides
    var $adjacent = getAdjacentSlides(slideIndex, $slides);
    // Grab the first image from each slide
    var prevImgURL = getSlideImage($adjacent.prev);
    var nextImgURL = getSlideImage($adjacent.next);
    // Get the prev/next buttons for this section
    var $section = $slides.closest('.section').first();
    var $prevBtn = $section.find('.fp-prev');
    var $nextBtn = $section.find('.fp-next');
    // If they don't currently have a background this is on page load.
    // We only need to insert the top layer if there is an image already there.
    var useLayer = $prevBtn.css('background-image') !== 'none';
    // Insert a div on top of the buttons and copy the current background
    if (useLayer) {
      $prevBtn.add($nextBtn).each(function() {
        var $btn = $(this);
        $('<div></div>')
          .css('background-image', $btn.css('background-image'))
          .appendTo($btn);
      });
    } else {
      $prevBtn.add($nextBtn).removeClass('show');
    }
    // Apply the images to the button itself
    $prevBtn.css('background-image', 'url("'+prevImgURL+'")');
    $nextBtn.css('background-image', 'url("'+nextImgURL+'")');
    // Preload the images before showing them
    // - Create new image objects
    var prevImg = new Image();
    var nextImg = new Image();
    // - Once the images have loaded, fade out the old img on top and remove it.
    //   Also make sure we have faded the button in.
    prevImg.onload = function() {
      if (useLayer) {
        $prevBtn.find('div').fadeOut(300, function() { $(this).remove(); });
      }
      $prevBtn.addClass('show');
    };
    nextImg.onload = function() {
      if (useLayer) {
        $nextBtn.find('div').fadeOut(300, function() { $(this).remove(); });
      }
      $nextBtn.addClass('show');
    };
    // - Apply the image URLs to load the images
    prevImg.src = prevImgURL;
    nextImg.src = nextImgURL;
  }

  /**
   * Updates the currently active link in the horizontal slider's navigation
   *
   * @param  {object}  $section          The chosen section as a jQuery selection
   * @param  {integer} activeSlideIndex  index of active slide. Starting from 0
   * @return {void}
   */
  function updateSliderNavigation($section, activeSlideIndex) {
    // Locate the menu for this slider
    var $menu = $section.find('.menu');
    // Deactivate all links in the menu
    $menu.find('a').removeClass('active');
    // Activate the link for the active slide
    $menu.find('a').eq(activeSlideIndex).addClass('active');
  }

});
