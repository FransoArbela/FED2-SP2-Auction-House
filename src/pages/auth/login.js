import {login} from '../../api/auth/login.js';

const form = document.forms['loginForm'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  
  const response = await login(email, password);
  if (response) {
    window.location.href = `${window.location.origin}/index.html`;
  } else {
    alert('Login failed. Please try again.');
  }
});
