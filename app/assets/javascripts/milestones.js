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

  // TODO Remove before going live
  $('img.lazy').popover({
    trigger: 'hover',
    html: true,
    title: 'Preview',
    content: function() {
      var img = $( this ).data( 'original' );
      var large_thumb = img.replace('getThumbnail', 'getScaled?maxWidth=&maxHeight=');
      var img = '<img id="large_thumb" src="' + large_thumb +'" />';
      return img;
    },
    container: 'body',
    placement: 'auto'
  });

  $('#globalnav').accessibleMegaMenu();

  // hack so that the megamenu doesn't show flash of css animation after the page loads.
  setTimeout(function () {
    $('body').removeClass('init');
  }, 500);

});
