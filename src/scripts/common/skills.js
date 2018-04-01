module.exports = function() {

  const WIN = window;
  const DOC = document;
  const $skills = $('#skills'); // блок скилов

  const $circles = $('.skills__second-circle'); // круги
  const circles = $circles.toArray(); // []

  let isShow = false;

  function getCoords(elem) {
    const box = elem.getBoundingClientRect(); // {top: 123, left: 123}

    return {
      top: box.top + WIN.pageYOffset,
      left: box.left + WIN.pageXOffset
    };
  }

  function checkSkills() {
    function setStroke(circle) {

      if (circle.dataset.percent) {
        var number = 282.6 * circle.dataset.percent / 100;
        circle.setAttribute('style', `stroke-dasharray : ${number} 282.6`);

      }
    }

    const elemCoords = getCoords($skills[0]);

    if (WIN.pageYOffset >= elemCoords.top - (elemCoords.top/3)) {
      isShow = true;

      circles.forEach(circle => {
        setStroke(circle);
      });
    }
  }

  $(WIN).scroll(() => {
    if (!isShow) {
      checkSkills();
    }
  });

};
