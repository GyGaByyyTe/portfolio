var $ = require('jquery');

require('./common/flipper');
require('./common/blog');

// $(document).ready(function(){
//   $(".blog__aside-link").on("click", function (event) {
//       event.preventDefault();
//       var id  = $(this).attr('href');
//       console.log(`${id}`);
//       var top = $(`${id}`).offset().top;
//       console.log(top);      
//       $('body,html').animate({scrollTop: top}, 700);
//   });
// });

// const activeArticleLink = document.querySelector('.blog__aside-item');
// if (activeArticleLink ) {
//   activeArticleLink.setAttribute(
//     'class',
//     'blog__aside-item blog__aside-item--active'
//   );
// } else {
//   // не существует
// }

console.log('hello from JS');

// menu overlay
var sliderOverlay = $('#nav');
console.log(sliderOverlay);
$('.hamburger__link').click(function(e) {
  e.preventDefault();
  $(this).toggleClass('hamburger__link--pressed');
  sliderOverlay.slideToggle(500);
});
