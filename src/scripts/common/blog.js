$(document).ready(function() {
  const WIN = window;
  const DOC = document;
  const $articles = $('.blog__article'); // статьи справа
  const articles = $articles.toArray(); // []
  const $articlesList = $('#blog__aside-list'); // ul со списком статей слева
  const $articleTitles = $('#blog__aside'); // aside
  const $articlesWidth = $('.blog__dummy'); // блок для получения ширины списка
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
    // в elemChords получаем объект с координатами aside
    const elemChords = getCoords($articleTitles[0]);

    if (WIN.pageYOffset >= elemChords.top - 30) {
      const listCoords = getCoords($articlesList[0]);
      $articlesList.css({
        position: 'fixed',
        top: 30 + 'px',
        left: listCoords.left + 'px'
      });
    } else {
      $articlesList.css({
        position: 'static',
        width: 'initial'
      });
    }
  }

  if ($articlesList.length && $articles.length) {
    $articlesList.css({
      width: $articlesList.outerWidth()
    });

    // выполниться только тогда когда будет действия скроллинг
    $(WIN).scroll(() => {
      $articlesList.css({
        width: $articlesWidth.outerWidth()
      });
      setArticleChords();
      setArticleActive();
    });

    // выполниться при загрузке кода
    setArticleChords();
    setArticleActive();

    //resize ширины списка ссылок, при изменении окна
    $(WIN).resize(() => {
      $articlesList.css({
        width: $articlesWidth.outerWidth()
      });
    });
    //плавный скролл между статьями, без мусора в адресной строке
    $(".blog__aside-link").on("click", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href');
        console.log(`${id}`);
        var top = $(`${id}`).offset().top;
        console.log(top);      
        $('body,html').animate({scrollTop: top}, 700);
    });

  }
});
