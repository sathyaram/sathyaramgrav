$(document).ready(function() {

  // All of the page's sections
  var $sections = $('header').add($('section[id]')).add($('footer'));

  // Detect which section we have scrolled to
  function detectSection() {
    // Get the current offset of all sections
    var sections = getSections();
    // Determine the current scroll distance of the window
    var scroll = $(window).scrollTop();
    // The selected offset object
    var selected = null;
    // Loop the sections
    for (var offset in sections) {
      if (Math.floor(offset) <= Math.ceil(scroll)) {
        selected = sections[offset];
      }
    }
    // Return the section we selected
    return selected;
  }

  // Returns an array containing objects describing each section and its scroll offset
  function getSections() {
    var sections = {};
    $sections.each(function(index) {
      sections[$(this).offset().top] = $(this).attr('id');
    });
    return sections;
  }

  // Sets the page's URL using the history API
  function setURL(newpath) {
    // history.pushState('', document.title, '/' + newpath);
    if (newpath === '') {
      history.pushState('', document.title, window.location.pathname + window.location.search);
    } else {
      window.location.hash = newpath;
    }
  }

  // Updates the page's URL based on the current section
  function updateURL() {
    var section = detectSection();
    if (section === undefined) section = '';
    setURL(section);
  }

  // When scrolling, update the URL
  $(window).scroll(updateURL);
  // Run the above functionality on pageload
  updateURL();

});
