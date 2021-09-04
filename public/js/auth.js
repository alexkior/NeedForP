const authForm = document.querySelector('#userAuthForm');

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));
  const response = await fetch('/user/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(formData)
  });
  if (response.ok) {
    window.location.href = 'http://localhost:3000';
  } else {
    window.location.href = 'http://localhost:3000/user/auth';
  }
});
