var $ = require('jquery');

const activeArticleLink = document.querySelector('.blog__aside-item');
if (activeArticleLink ) {
  activeArticleLink.setAttribute(
    'class',
    'blog__aside-item blog__aside-item--active'
  );
} else {
  // не существует
}

console.log('hello from JS');

// menu overlay
var sliderOverlay = $('#nav');
console.log(sliderOverlay);
$('.hamburger__link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('hamburger__link--pressed');
  sliderOverlay.slideToggle(500);
});
