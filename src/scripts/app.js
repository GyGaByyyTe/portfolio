var $ = require('jquery');

require('./common/flipper');
require('./common/blog');
require('./common/skills');

// menu overlay
var sliderOverlay = $('#nav');
console.log(sliderOverlay);
$('.hamburger__link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('hamburger__link--pressed');
  sliderOverlay.slideToggle(500);
});
