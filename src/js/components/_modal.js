const bodyHtml = document.querySelector('body, html');
const modal = document.querySelector('.modal');
const openModalBtn = document.querySelector('[data-modal]');
const modalSelects = document.querySelectorAll('.modal__select');

const openModal = () => {
  modal.classList.add('modal--active');
  bodyHtml.classList.add('lock');
};

const closeModal = () => {
  modal.classList.remove('modal--active');
  bodyHtml.classList.remove('lock');
};

if(modal) {
  openModalBtn.addEventListener('click', () => {
    openModal();
  });

  modal.addEventListener('click', e => {
    const target = e.target;
    if(target.classList.contains('modal__close') || target.classList.contains('modal__overlay')) {
      closeModal();
    };
  })
  
  window.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
      closeModal();
    };
  });
};

// цвет тексат в селекте

modalSelects.forEach(el => {
  el.querySelector('select').addEventListener('change', () => {
    el.querySelector('select').style.color = '#000';
  });
});