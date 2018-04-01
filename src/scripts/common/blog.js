module.exports = function () {
  const WIN = window;
  const DOC = document;
  const $articles = $('.blog__article'); // статьи справа
  const articles = $articles.toArray(); // []
  const $articlesList = $('#blog__aside-list'); // ul со списком статей слева
  const $articleTitles = $('#blog__aside'); // aside
  const $articlesWidth = $('.blog__dummy'); // блок для получения ширины списка
  const $blogMain = $('.blog__main');
  let isSidebarOpen = false;
  // document.documentElement.clientWidth
  let activeArticleId = null;

  function getCoords(elem) {
    const box = elem.getBoundingClientRect(); // {top: 123, left: 123}

    return {
      top: box.top + WIN.pageYOffset,
      left: box.left + WIN.pageXOffset
    };
  }

  function setArticleActive() {
    function setActive(artcl) {
      if (artcl.dataset.idtitle !== activeArticleId) {
        $('.blog__aside-item').removeClass('blog__aside-item--active');
        $(`#${artcl.dataset.idtitle}`).addClass('blog__aside-item--active');
        activeArticleId = artcl.dataset.idtitle;
      }
    }

    if (WIN.pageYOffset < getCoords(articles[0]).top) {
      setActive(articles[0]);
    } else if (
      WIN.pageYOffset + WIN.innerHeight ===
      $(document).outerHeight(true)
    ) {
      setActive(articles[articles.length - 1]);
    } else {
      articles.forEach(article => {
        const elemTop = getCoords(article).top;
        if (WIN.pageYOffset > elemTop - 150) {
          setActive(article);
        }
      });
    }
  }

  function setArticleChords() {
    // в elemChords получаем объект с координатами blockMain
    const elemChords = getCoords($blogMain[0]);

    if (WIN.pageYOffset >= elemChords.top - 30) {
      if (document.documentElement.clientWidth < 752) {
        const listCoords = getCoords($articleTitles[0]);
        $articleTitles.css({
          position: 'fixed',
          top: 0
          // left: listCoords.left + 'px'
        });
        $articlesList.css({
          position: 'static'
        });
      } else {
        const listCoords = getCoords($articlesList[0]);
        $articlesList.css({
          position: 'fixed',
          top: 30 + 'px',
          left: listCoords.left + 'px'
        });
        $articleTitles.css({
          position: 'static'
        });
      }
    } else {
      if (document.documentElement.clientWidth < 752) {
        $articleTitles.css({
          position: 'absolute'
        });
      } else {
        $articlesList.css({
          position: 'static',
          width: 'initial'
        });
      }
    }
  }

  function resizeArticleList() {
    if (document.documentElement.clientWidth >= 752) {
      $articlesList.css({
        width: $articlesWidth.outerWidth()
      });
    } else {
      $articlesList.css({
        width: 'initial'
      });
    }
  }

  function asideClose() {
    $articleTitles.css({
      right: '100%'
    });
  }

  function asideOpen() {
    if (isSidebarOpen) {
      asideClose();
    } else {
      $articleTitles.css({
        right: '21%'
      });
    }
    isSidebarOpen = !isSidebarOpen;
  }

  if ($articlesList.length && $articles.length) {
    // выполниться только тогда когда будет действия скроллинг
    $(WIN).scroll(() => {
      resizeArticleList();
      setArticleChords();
      setArticleActive();
    });

    // выполнится при загрузке кода
    resizeArticleList();
    setArticleChords();
    setArticleActive();

    //resize ширины списка ссылок, при изменении окна
    $(WIN).resize(() => {
      resizeArticleList();
      setArticleChords();
    });
    //плавный скролл между статьями, без мусора в адресной строке
    $('.blog__aside-link').on('click', function(event) {
      event.preventDefault();
      var id = $(this).attr('href');
      var top = $(`${id}`).offset().top;
      $('body,html').animate({ scrollTop: top }, 700);
    });
    //открытие сайдбара на модильных девайсах
    $('.blog__aside-open').on('click', function() {
      asideOpen();
    });
    $articleTitles.on('click', function(e) {
      if (!e.target.closest('.blog__aside-open')) {
        asideOpen();
      }
    });
  }
};
