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
