import {login} from '../../api/auth/login.js';

const form = document.forms['loginForm'];

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const email = formData.get('email');
  const password = formData.get('password');

  
  const response = await login(email, password);
  if (response) {
    console.log('Login successful:', response);
  } else {
    console.error('Login failed:', response);
  }
});
