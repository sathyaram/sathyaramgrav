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
