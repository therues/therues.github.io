require([
  'jquery',
  'bootstrap-sass-official',
  'gsap'
],function(
  $,
  _bootstrap,
  _gsap
) {

  'use strict';

  $(function() {

    $('body').scrollspy({
      offset: parseInt( $('body').css("padding-top") )
    });

    $('.navbar-nav a').click(function(e) {

      e.preventDefault();
      if ($(this).attr("href")) {
        TweenMax.to('body',1,{ scrollTop: $( $(this).attr("href") ).position().top - parseInt( $('body').css("padding-top") ) + 1, ease:Expo.easeOut });
      }

    });

  });

});
