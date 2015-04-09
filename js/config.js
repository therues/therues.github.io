require.config({
  shim: {
    'bootstrap-sass-official': {
      deps: [
        'jquery'
      ]
    }
  },
  baseUrl: 'js/app',
  paths: {
    app: 'app',
    'bootstrap-sass-official': '../lib/bootstrap-sass-official/assets/javascripts/bootstrap',
    requirejs: '../lib/requirejs/require',
    jquery: '../lib/jquery/dist/jquery',
    gsap: '../lib/gsap/src/uncompressed/TweenMax'
  }
});

require(['app']);
