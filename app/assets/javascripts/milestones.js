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

  $('.fa-bars').click(function() {
    $("#toc").toggle("slow");
  });

  $('img.lazy').lazyload({
    effect: "fadeIn",
    failure_limit: 10
  });

});
