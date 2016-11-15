$(document).ready(function() {
  //hamburger menu toggle
  $('.mobile-nav').hide();
  $('span.nav-toggle').click(function() {
    $('.mobile-nav').toggle();
      // $('span.nav-toggle').hide();
    });
  });
  // $('.nav-toggle').click(function(e) {
  //   $('.nav-toggle, .nav-item').toggleClass("is-active");
  //   e.preventDefault();
  //
  // });
