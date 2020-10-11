const toggleAriaPressed = document.querySelector('[aria-pressed]');

toggleAriaPressed.addEventListener('click', () => {
  let ariaPressed = toggleAriaPressed.getAttribute('aria-pressed') === 'true';
  toggleAriaPressed.setAttribute('aria-pressed', !ariaPressed);
});