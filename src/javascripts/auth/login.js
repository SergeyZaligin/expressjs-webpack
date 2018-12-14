import {
  serialize,
} from '../libs/jDi';

const login = (selector) => {
  const loginSelector = document.querySelector(selector);

  if (loginSelector) {
    loginSelector.addEventListener('submit', async (e) => {
      e.preventDefault();

      const response = await fetch('/auth/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: serialize(loginSelector),
      });

      const json = await response.json();
      const msg = document.querySelector('.message');
      msg.innerHTML = json.message;
      if (json.message) {
        setTimeout(() => {
          msg.innerHTML = '<a href=\'/auth/login\'>На главную</a>';
        }, 3000);
      }
      // window.location = '/auth/login';
    });
  } else {
    return null;
  }
};

export default login;
