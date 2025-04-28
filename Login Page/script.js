const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
  container.classList.remove("right-panel-active");
});

// Store user data
const data = [
    { 
        name: "atishya", 
        email: "atishya@example.com",
        password: "12345"
    }
];

// Sign-up Logic
const signUpForm = document.querySelector('.sign-up-container form');
signUpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const name = signUpForm.querySelector('input[placeholder="Name"]').value;
  const email = signUpForm.querySelector('input[placeholder="Email"]').value;
  const password = signUpForm.querySelector('input[placeholder="Password"]').value;

  // Validate if fields are not empty
  if (!name || !email || !password) {
    alert('All fields are required!');
    return; // Stop the form submission
  }

  // Check if user already exists
  const userExists = data.some(user => user.email === email);
  
  if (userExists) {
    alert('User already exists. Please sign in.');
  } else {
    data.push({ name, email, password });
    alert('Registration successful! Please sign in.');
    container.classList.remove("right-panel-active"); // Switch to sign-in
  }
});

// Sign-in Logic
const signInForm = document.querySelector('.sign-in-container form');
signInForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const email = signInForm.querySelector('input[placeholder="Email"]').value;
  const password = signInForm.querySelector('input[placeholder="Password"]').value;

  const user = data.find(user => user.email === email && user.password === password);
  
  if (user) {
    alert(`Welcome back, ${user.name}!`);
    window.location.href = "../Quiz selection page/index.html";
  } else {
    alert('Invalid email or password.');
  }
});
