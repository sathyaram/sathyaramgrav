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
    viewFactor: 0.25
  });

  // Animate the full-width section articles
  SR.reveal('section > .wrapper > article.full-width', {
    viewFactor: 0.25
  });
  // Animate the regular section articles
  SR.reveal('section > .wrapper > article:not(.full-width)', {
    viewFactor: 0.25
  });

  // Animate the filter list in the photography section
  // - Stagger the animations by 100ms each
  SR.reveal('#photography li', {
    origin: 'left'
  }, 250);

});
