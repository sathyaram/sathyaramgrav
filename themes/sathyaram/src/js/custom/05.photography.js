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

});
