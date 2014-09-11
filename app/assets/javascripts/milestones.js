"use strict"
$(document).ready(function() {

  var offset = 200;
  var duration = 500;

  $(window).scroll(function() {
    if ( $(this).scrollTop() > offset) {
      $('.scroll-to-top').fadeIn(duration);
    } else {
      $('.scroll-to-top').fadeOut(duration);
    }
  });

  $('.scroll-to-top').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, duration);
    return false;
  });

  $('.authorNote').hide();
  $('.modal-content').hide(); 

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

  $('.transcription-trigger').click(function(event) {
    event.preventDefault();

    var content = $( this ).parent().next('.transcription-body').html();

    bootbox.dialog({
      title: "Marginalia",
      message: content,
      buttons: {
        main: {
          label: "Close",
          className: "btn-primary",
          callback: function() {
            //
          }
        }
      }
    });
  });

  $('.note').click(function() {
    var footnote = $(this).next('.authorNote');
    footnote.toggle('slow', 'linear');
  });

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
