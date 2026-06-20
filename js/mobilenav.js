document.addEventListener('DOMContentLoaded', function () {
  var burger = document.getElementById('burger');
  var mainNav = document.getElementById('main-nav');

  if (!burger || !mainNav) return;

  burger.setAttribute('aria-controls', 'main-nav');
  burger.setAttribute('aria-expanded', 'false');

  burger.addEventListener('click', function (event) {
    event.preventDefault();
    var isOpen = burger.classList.toggle('is-open');
    mainNav.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });
});
