const toggle = document.querySelector('[aria-pressed]');
toggle.addEventListener('click', () => {
  let pressed = toggle.getAttribute('aria-pressed') === 'true';
  toggle.setAttribute('aria-pressed', !pressed);
});