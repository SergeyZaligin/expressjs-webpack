const login = (selector) => {
  const loginSelector = document.querySelector(selector);

  if (loginSelector) {
    loginSelector.addEventListener('click', async (e) => {
      e.preventDefault();

      const email = document.querySelector('[type="email"]').value;
      const password = document.querySelector('[type="password"]').value;
      console.log('', email);
      console.log('password', password);
      const response = await fetch('/auth/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const json = await response.json();
      const msg = document.querySelector('.message');
      msg.innerHTML = json.message;
      // window.location = '/auth/login';
      console.log(json);
    });
  } else {
    return null;
  }
};

export default login;
