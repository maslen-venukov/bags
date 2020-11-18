// создание корзины и списка желаний

const createNewStorage = storageName => {
  if(!localStorage.getItem(storageName)) {
    localStorage.setItem(storageName, JSON.stringify({}));
  };
};

createNewStorage('basket');
createNewStorage('wish');

// счетчик корзины

const menuProductsCounter = document.querySelector('.menu__counter');
const menuLinkBasket = document.querySelector('.menu__link--basket');

const countProductsInBasket = () => {
  menuProductsCounter.innerText = Object.keys(JSON.parse(localStorage.getItem('basket'))).length;
  menuProductsCounter.innerText > 0 ? menuLinkBasket.classList.remove('menu__link--empty') : menuLinkBasket.classList.add('menu__link--empty');
};

countProductsInBasket();

// добавление в корзину и список желаний

const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

const addProductInStorage = (e, storageName, parentName = '.card', imgName = '.card__img img', nameName = '.card__name', priceName = '.card__price') => {
  const parent = e.target.closest(parentName);
  const storage = JSON.parse(localStorage.getItem(storageName));

  const today = new Date();
  today.setDate(today.getDate() + parseInt(parent.dataset.delivery));
  // today.getDate() + ' ' + months[today.getMonth()]

  const product = {
    img: parent.querySelector(imgName).getAttribute('src'),
    name: parent.querySelector(nameName).innerText,
    price: parent.querySelector(priceName).innerText,
    delivery: parentName === '.card' ? today.getDate() + ' ' + months[today.getMonth()] : parent.querySelector('.product__time time').innerText
  };
  storage[product.name] = product;

  localStorage.setItem(storageName, JSON.stringify(storage));

  // console.log(storage);
  // console.log(Object.keys(storage).length);
};

const addToBasketBtn = document.querySelectorAll('.to-basket');

addToBasketBtn.forEach(el => {
  el.addEventListener('click', e => {
    addProductInStorage(e, 'basket');
    countProductsInBasket();
  });
});

const addToWishListBtn = document.querySelectorAll('.like');

addToWishListBtn.forEach(el => {
  el.addEventListener('click', e => {
    addProductInStorage(e, 'wish');
    if(el.classList.contains('like--liked')) {
      const wish = JSON.parse(localStorage.getItem('wish'));
      delete wish[el.parentNode.querySelector('.card__name').innerText];
      localStorage.setItem('wish', JSON.stringify(wish));
    };
  });
});

// вывод в корзину и список желаний

const basketList = document.querySelector('.basket__list');

if(basketList) {
  const basket = JSON.parse(localStorage.getItem('basket'));
  for(let key in basket) {
    const product = basket[key];
    const productHTML = `
      <li class="basket__item product">
        <a href="single.html" class="product__img">
          <img src="${product.img}" alt="${product.name}">
        </a>
        <div class="product__info">
          <a href="single.html" class="product__name">${product.name}</a>
          <p class="product__time">Срок доставки: <time>${product.delivery}</time></p>
        </div>
        <button class="product__trash" aria-label="Удалить"></button>
        <button class="product__like like" aria-label="В список желаний">
          <svg xmlns="http://www.w3.org/2000/svg"><path d="M27.745 5.14a8.379 8.379 0 00-1.834-2.669A8.55 8.55 0 0019.904.028 8.607 8.607 0 0014.5 1.933 8.607 8.607 0 009.096.028a8.55 8.55 0 00-6.007 2.443 8.329 8.329 0 00-2.51 5.952c0 1.073.218 2.192.653 3.33.364.95.887 1.936 1.554 2.932 1.057 1.576 2.51 3.22 4.315 4.885 2.99 2.762 5.952 4.67 6.078 4.747l.764.49c.338.216.773.216 1.111 0l.764-.49c.126-.08 3.084-1.985 6.078-4.747 1.805-1.666 3.258-3.31 4.315-4.885.667-.996 1.193-1.982 1.554-2.933.434-1.137.654-2.256.654-3.329a8.205 8.205 0 00-.674-3.284zM14.5 22.257S3.027 14.908 3.027 8.423c0-3.284 2.717-5.945 6.069-5.945A6.085 6.085 0 0114.5 5.713a6.085 6.085 0 015.404-3.235c3.352 0 6.069 2.661 6.069 5.945 0 6.484-11.473 13.835-11.473 13.835z"/></svg>
        </button>
        <div class="product__counter">
          <button class="product__minus" aria-label="Минус">−</button>
          <input type="number" class="product__quantity" value="1">
          <button class="product__plus" aria-label="Плюс">+</button>
        </div>
        <p class="product__current-price">${product.price}</p>
        <p class="product__total-price">${product.price}</p>
      </li>
    `;
    basketList.insertAdjacentHTML('afterbegin', productHTML);
  };
};

const wishList = document.querySelector('.wish__list');

if(wishList) {
  const wish = JSON.parse(localStorage.getItem('wish'));
  for(let key in wish) {
    const product = wish[key];
    const productHTML = `
      <li class="wish__item product">
        <a href="single.html" class="product__img">
          <img src="${product.img}" alt="${product.name}">
        </a>
        <div class="product__info">
          <a href="single.html" class="product__name">${product.name}</a>
          <p class="product__time">Срок доставки: <time>${product.delivery}</time></p>
        </div>
        <button class="product__trash" aria-label="Удалить"></button>
        <button class="product__basket to-basket" aria-label="В список желаний">
          <svg width="33" height="31" xmlns="http://www.w3.org/2000/svg"><path d="M10.632 20.334h17.534a.967.967 0 00.93-.701l3.867-13.535a.967.967 0 00-.93-1.233H8.403l-.692-3.11a.967.967 0 00-.943-.757H.967a.967.967 0 100 1.934h5.025l3.49 15.708a2.905 2.905 0 00-1.748 2.66c0 1.6 1.302 2.901 2.9 2.901h17.532a.967.967 0 100-1.933H10.635a.968.968 0 01-.003-1.933zM30.752 6.8l-3.316 11.6H11.41L8.832 6.8h21.92z"/><path d="M9.668 27.102c0 1.599 1.301 2.9 2.9 2.9 1.6 0 2.9-1.301 2.9-2.9 0-1.6-1.3-2.9-2.9-2.9-1.599 0-2.9 1.3-2.9 2.9zm2.9-.967a.968.968 0 010 1.933.968.968 0 010-1.933zm10.764.967c0 1.599 1.301 2.9 2.9 2.9 1.6 0 2.9-1.301 2.9-2.9 0-1.6-1.3-2.9-2.9-2.9-1.599 0-2.9 1.3-2.9 2.9zm2.9-.967a.968.968 0 010 1.933.968.968 0 010-1.933z"/></svg>
        </button>
        <p class="product__total-price">${product.price}</p>
      </li>
    `;
    wishList.insertAdjacentHTML('afterbegin', productHTML);
  };
};

// добавление товара из списка желаний в корзину

const addToBasketBtnInWishList = document.querySelectorAll('.product__basket.to-basket');

addToBasketBtnInWishList.forEach(el => {
  el.addEventListener('click', e => {
    addProductInStorage(e, 'basket', '.product', '.product__img img', '.product__name', '.product__total-price');
    if(el.classList.contains('product__basket--added')) {
      const basket = JSON.parse(localStorage.getItem('basket'));
      delete basket[el.parentNode.querySelector('.product__name').innerText];
      localStorage.setItem('basket', JSON.stringify(basket));
    };
    countProductsInBasket();
    el.classList.toggle('product__basket--added');
  });

  const basket = JSON.parse(localStorage.getItem('basket'));
  for(let key in basket) {
    const parent = el.parentNode.querySelector('.product__name');
    if(parent.innerText == key) {
      el.classList.add('product__basket--added');
    };
  };
});

// добавление товара из корзины в список желаний

const addToWishListBtnInBasket = document.querySelectorAll('.product__like.like');

addToWishListBtnInBasket.forEach(el => {
  el.addEventListener('click', e => {
    addProductInStorage(e, 'wish', '.product', '.product__img img', '.product__name', '.product__current-price');
    if(el.classList.contains('like--liked')) {
      const wish = JSON.parse(localStorage.getItem('wish'));
      delete wish[el.parentNode.querySelector('.product__name').innerText];
      localStorage.setItem('wish', JSON.stringify(wish));
    };
  });
});

// удаление товара из корзины

const productTrash = document.querySelectorAll('.product__trash');

const deleteProductFromStorage = (e, storageName) => {
  const product = e.target.closest('.product');
  const storage = JSON.parse(localStorage.getItem(storageName));
  const page = document.querySelector('.' + storageName);

  if(page) {
    for(let key in storage) {
      if(key === product.querySelector('.product__name').innerText) {
        delete storage[key];
      };
    };
    localStorage.setItem(storageName, JSON.stringify(storage));
  };

  product.remove();
};

productTrash.forEach(el => {
  el.addEventListener('click', e => {
    deleteProductFromStorage(e, 'basket');
    deleteProductFromStorage(e, 'wish');

    countBasketPrice();
    countProductsInBasket();
  });
});

// продукт в корзине

const productMinus = document.querySelectorAll('.product__minus');
const productPlus = document.querySelectorAll('.product__plus');
const productQuantity = document.querySelectorAll('.product__quantity');
const productTotalPrice = document.querySelectorAll('.product__total-price');
const basketPrice = document.querySelector('.basket__price');

const priceTransformation = value => {
  const arrayValue = String(value).split('');
  for(let i = arrayValue.length - 1; i > -1; i-=3) {
    if(i !== arrayValue.length - 1) arrayValue.splice(i+1, 0, '.');
  };
  const calculatedValue = arrayValue.join('') + ' руб'
  return calculatedValue;
};

const countBasketPrice = () => {
  if(basketPrice) {
    const productTotalPrice = document.querySelectorAll('.product__total-price');
    let totalPrice = 0;
    productTotalPrice.forEach(el => {
      totalPrice += parseInt(el.innerText.replace(/\./g, '').replace('руб', ''));
    });
    basketPrice.innerText = priceTransformation(totalPrice);
  };
};

const calcProductTotalPrice = (cur, qt, total) => {
  const clearValue = cur.innerText.replace(/\./g, '').replace('руб', '') * qt.value;
  total.innerText = priceTransformation(clearValue);

  countBasketPrice();
};

countBasketPrice();

if(productMinus && productPlus) {
  productMinus.forEach(el => {
    el.addEventListener('click', e => {
      const productQuantity = e.target.closest('.product__counter').querySelector('.product__quantity');
      const productCurrentPrice = e.target.closest('.product').querySelector('.product__current-price');
      const productTotalPrice = e.target.closest('.product').querySelector('.product__total-price');

      if(productQuantity.value > 1) {
        productQuantity.value--;
      };

      calcProductTotalPrice(productCurrentPrice, productQuantity, productTotalPrice);
    });
  });

  productPlus.forEach(el => {
    el.addEventListener('click', e => {
      const productQuantity = e.target.closest('.product__counter').querySelector('.product__quantity');
      const productCurrentPrice = e.target.closest('.product').querySelector('.product__current-price');
      const productTotalPrice = e.target.closest('.product').querySelector('.product__total-price');

      if(productQuantity.value < 999) {
        productQuantity.value++;
      };

      calcProductTotalPrice(productCurrentPrice, productQuantity, productTotalPrice);
    });
  });
};

productQuantity.forEach(el => {
  el.addEventListener('keyup', e => {
    if(String(el.value).length > 3) el.value = el.value.slice(0, -1);
    if(String(el.value).substr(0, 1) === '0') el.value = el.value.slice(1);
    if(String(el.value).includes('-') || String(el.value).includes('+')) el.value = el.value.replace('+', '').replace('-', '');

    const productCurrentPrice = el.closest('.product').querySelector('.product__current-price');
    const productTotalPrice = el.closest('.product').querySelector('.product__total-price');
    calcProductTotalPrice(productCurrentPrice, el, productTotalPrice);
  });
});