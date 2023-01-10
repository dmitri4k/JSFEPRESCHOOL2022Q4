// Burger handler
(function () {
  const burgerItem = document.querySelector('.burger');
  const menu = document.querySelector('.nav');
  const menuCloseItem = document.querySelector('.nav-close');
  const menuLinks = document.querySelectorAll('.nav-link');
  burgerItem.addEventListener('click', () => {
      menu.classList.add('nav_active');
  });
  menuCloseItem.addEventListener('click', () => {
      menu.classList.remove('nav_active');
  });
  if (window.innerWidth <= 767) {
      for (let i = 0; i < menuLinks.length; i += 1) {
          menuLinks[i].addEventListener('click', () => {
              menu.classList.remove('nav_active');
          });
      }
  }
}());