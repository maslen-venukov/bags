const headerTop = document.querySelector('.header__top');
const headerBottom = document.querySelector('.header__bottom');

const headerBottomMarginTop = () => {
  headerBottom.style.marginTop = headerTop.clientHeight + 'px';
};

const headerTopPaddintTop = () => {
  self.pageYOffset > 0 ? headerTop.style.paddingTop = '25px' : headerTop.style.paddingTop = '50px';
};

window.addEventListener('scroll', () => {
  headerTopPaddintTop();
});

window.addEventListener('resize', () => {
  headerBottomMarginTop();
});

headerBottomMarginTop();