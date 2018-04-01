var $ = require('jquery');

const preloaderInit = require('./common/preloader');
const flipperInit = require('./common/flipper');
const blogInit = require('./common/blog');
const skillsInit = require('./common/skills');
const googleMap = require('./common/map');


if (document.images.length > 0) {
  preloaderInit();
} else {
  document.getElementById('js-preloader').classList.add('done');
  document.body.style.overflow = 'auto';
}

if (document.getElementById('flipper')) {
  flipperInit();
}

if (document.getElementsByClassName('blog__main').length > 0) {
  blogInit();
}

if (document.getElementsByClassName('skills__second-circle').length > 0) {
  skillsInit();
}



// menu overlay
var sliderOverlay = $('#nav');
$('.hamburger__link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('hamburger__link--pressed');
  sliderOverlay.slideToggle(500);
});
