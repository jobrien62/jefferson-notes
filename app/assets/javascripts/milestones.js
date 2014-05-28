"use strict"
$(document).ready(function() {
  $('.editorialTrigger').popover(
    {
      title: 'Editorial Note',
      placement: 'auto',
      //content:  $(this).next('.addEditorial').html(),
      content: function(){
        return $(this).next('.addEditorial').html();
      },
      container: 'body',
      html: true,
    }
  );

  $('.note').click(function() {
    console.log('note', $(this).next('.authorNote').html());
  });

  $('.note').popover(
    {
      title: 'Footnote',
      placement: 'auto',
      content: function() {
        return $(this).next('.authorNote').html();
      },
      container: 'body',
      html: true
    }
  );

  $('img.lazy').lazyload({
    effect: "fadeIn",
    failure_limit: 10
  });

  $('#globalnav').accessibleMegaMenu();

  // hack so that the megamenu doesn't show flash of css animation after the page loads.
  setTimeout(function () {
    $('body').removeClass('init');
  }, 500);

});
