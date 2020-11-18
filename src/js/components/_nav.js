const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(el => {
  if(window.location.href.includes(el.getAttribute('href'))) {
    el.classList.add('nav__link--active');
  } else if(window.location.href.includes('single.html') && el.innerText === 'Каталог') {
    el.classList.add('nav__link--active');
  };
});