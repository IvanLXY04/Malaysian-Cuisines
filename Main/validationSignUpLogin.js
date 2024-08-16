// Function to handle sign up
function handleSignUp(event) {
  event.preventDefault();
  const firstname_input = document.getElementById('firstname').value;
  const email_input = document.getElementById('email').value;
  const password_input = document.getElementById('password').value;
  const repeatPassword_input = document.getElementById('repeatPassword').value;
  const messageElement = document.getElementById('message');

  if (password_input !== repeatPassword_input) {
      messageElement.textContent = 'Passwords do not match.';
      alert('Passwords do not match.');
      return;
  }

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(user => user.email === email_input);

  if (existingUser) {
     messageElement.textContent = 'User already exists. Please login.';
     alert('User already exists. Please login.');
  } else {
      const newUser = { firstname: firstname_input, email: email_input, password: password_input };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      sessionStorage.setItem('sessionusers', JSON.stringify(users));

      messageElement.textContent = 'Sign up successful! Please login.';
      alert('Sign up successful! Please login.');
      setTimeout(() => {
          window.location.href = 'login.html';
      }, 2000);
  }
}

// Function to handle login
function handleLogin(event) {
  event.preventDefault();
  const email_input = document.getElementById('email').value;
  const password_input = document.getElementById('password').value;
  const messageElement = document.getElementById('message');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email_input && u.password === password_input);

  if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      messageElement.textContent = 'Login successful!';
      alert('Login successful!');
      setTimeout(() => {
          window.location.href = 'cookiesConsent.html'; // Redirect to a dashboard or home page
      }, 2000);
  } else {
      messageElement.textContent = 'Invalid email or password. Please try again or sign up.';
      alert('Invalid email or password. Please try again or sign up.');
  }
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
  const signUpForm = document.getElementById('signUpForm');
  const loginForm = document.getElementById('loginForm');

  if (signUpForm) {
      signUpForm.addEventListener('submit', handleSignUp);
  }

  if (loginForm) {
      loginForm.addEventListener('submit', handleLogin);
  }
});