// тоггл кллассов у лайка

window.addEventListener('click', e => {
  const like = e.target.closest('.like');
  if(like) {
    like.classList.toggle('like--liked');
  };
});

// выделение лайкнутых карточек после загрузки страницы

const highlightLikedCards = (itemName, parentName) => {
  const names = document.querySelectorAll(itemName);
  names.forEach(el => {
    const wish = JSON.parse(localStorage.getItem('wish'));
    for(let key in wish) {
      const like = el.closest(parentName).querySelector('.like');
      if(el.innerText == key && like) {
        like.classList.add('like--liked');
      };
    };
  });
};

highlightLikedCards('.card__name', '.card');
highlightLikedCards('.product__name', '.product');