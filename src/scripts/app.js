var $ = require('jquery');

require('./common/flipper');
require('./common/blog');
require('./common/skills');
const googleMap = require('./common/map');
const preloaderInit = require('./common/preloader');

if (document.images.length > 0) {
  preloaderInit();
} else {
  document.getElementById('js-preloader').classList.add('done');
  document.body.style.overflow = 'auto';
}

// menu overlay
var sliderOverlay = $('#nav');
console.log(sliderOverlay);
$('.hamburger__link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('hamburger__link--pressed');
  sliderOverlay.slideToggle(500);
});
