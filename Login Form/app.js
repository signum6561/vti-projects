const signInBtn = document.querySelector('#signin-btn');
const signUpBtn = document.querySelector('#signup-btn');
const container = document.querySelector('.container');

signUpBtn.addEventListener('click', () => {
  container.classList.add('signup-active');
});

signInBtn.addEventListener('click', () => {
  container.classList.remove('signup-active');
});
