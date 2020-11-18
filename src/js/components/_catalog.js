// активный фильтр + раскрытие подлиста фильтров

const filtersListNames = document.querySelectorAll('.filters-list__name');

filtersListNames.forEach(el => {
  el.addEventListener('click', () => {
    const filtersItem = el.closest('.filters-list__item');
    const sublist = filtersItem.querySelector('.filters__sublist');

    if (filtersItem.classList.contains('filters-list__item--active')) {
      filtersItem.classList.remove('filters-list__item--active');
      sublist.style.maxHeight = '0px';
    } else {
      filtersListNames.forEach(el => {
        const everyFiltersItem = el.closest('.filters-list__item')
        everyFiltersItem.classList.remove('filters-list__item--active');

        if (everyFiltersItem.querySelector('.filters__sublist')) {
          everyFiltersItem.querySelector('.filters__sublist').style.maxHeight = '0px';
        };
      });

      filtersItem.classList.add('filters-list__item--active');
      if (sublist) {
        sublist.style.maxHeight = sublist.querySelectorAll('.filters-sublist__item').length * 50 + 'px';
        if (sublist.querySelectorAll('.filters-sublist__item').length === 1) {
          sublist.style.maxHeight = '59px';
        };
      };
    };
  });
});

// активный фильтр подлиста

const filtersSiblistItems = document.querySelectorAll('.filters-sublist__item');

filtersSiblistItems.forEach(el => {
  el.addEventListener('click', () => {
    filtersSiblistItems.forEach(el => {
      el.classList.remove('filters-sublist__item--active');
    });
    el.classList.add('filters-sublist__item--active');
  });
});

// активный пункт выборов в горизонтальных фильтрах в каталоге

const choicesLegends = document.querySelectorAll('.choices__legend');

choicesLegends.forEach(el => {
  el.addEventListener('click', () => {
    if(el.classList.contains('choices__legend--active')) {
      el.classList.remove('choices__legend--active');
    } else {
      choicesLegends.forEach(el => {
        el.classList.remove('choices__legend--active');
      });
      el.classList.add('choices__legend--active');
    };
  });
});

// активный чекбокс в горизонтальных фильтрах

const choicesInputs = document.querySelectorAll('.choices__input');

choicesInputs.forEach(el => {
  el.addEventListener('change', e => {
    e.target.closest('.choices__label').classList.toggle('choices__label--active');
  });
});

// слайдер с двумя ползунками в горизонтальных фильтрах

const getRangeSliderValues = e => {
  const parent = e.target.parentNode;
  const slides = parent.querySelectorAll('.range-slider__input');
  let firstSlideValue = parseInt(slides[0].value);
  let secondSlideValue = parseInt(slides[1].value);

  if(firstSlideValue >= secondSlideValue) {
    let temp = secondSlideValue;
    secondSlideValue = firstSlideValue;
    firstSlideValue = temp;
  };

  const sliderMinValue = parent.querySelector('.range-slider__min');
  sliderMinValue.innerText = firstSlideValue + ' руб';

  const sliderMaxValue = parent.querySelector('.range-slider__max');
  sliderMaxValue.innerText = secondSlideValue + ' руб';
};

const sliderWrappers = document.querySelectorAll('.range-slider');
const sliders = document.querySelectorAll('.range-slider__input');

sliderWrappers.forEach(el => {
  sliders.forEach((el, index) => {
    sliders[index].addEventListener('input', getRangeSliderValues);
  });
});