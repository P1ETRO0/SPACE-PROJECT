//! --- LÓGICA DO MENU HAMBURGER ---

document.addEventListener('DOMContentLoaded', () => {

  // 1. Seleciona os três elementos
  const hamburgerBtn = document.querySelector('.btn-hamburger');
  const closeBtn = document.querySelector('.btn-close');
  const navMenu = document.querySelector('header nav');

  // 2. Quando clicar no Hamburger:
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      // Adiciona a classe 'nav-active' ao menu
      navMenu.classList.add('nav-active');
    });
  }

  // 3. Quando clicar no 'X' (Close):
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      // Remove a classe 'nav-active' do menu
      navMenu.classList.remove('nav-active');
    });
  }
});