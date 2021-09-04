const deleteForm = document.querySelector('#deleteForm');
const changeForm = document.querySelector('#changeForm');

deleteForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target));

  const response = await fetch('/user/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ formData })
  });

  if (response.ok) {
    window.location.href = 'http://localhost:3000/user/account';
  }
})
