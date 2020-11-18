const ratingElements = document.querySelectorAll('[data-rating]');

ratingElements.forEach(el => {
  const rating = el.dataset.rating;
  const stars = el.querySelectorAll('svg');
  stars.forEach(el => {
    if(el.dataset.star <= rating) {
      el.style.fill = "#ffc700";
    };
  });
});