$(document).ready(function() {


  $('.editorialTrigger').click(function() {
     console.log($(this).next('.addEditorial').html());
  });

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
});
