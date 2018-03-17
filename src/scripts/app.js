const slider = require('./common/slider');

slider(); // инициализируем слайдер

const activeArticleLink = document.querySelector('.blog__aside-item');
activeArticleLink.setAttribute('class', 'blog__aside-item blog__aside-item--active');
