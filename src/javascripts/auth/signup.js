import {
  serialize,
} from '../libs/jDi';

const signup = (selector) => {
  const signupSelector = document.querySelector(selector);

  if (signupSelector) {
    signupSelector.addEventListener('submit', async (e) => {
      e.preventDefault();

      const response = await fetch('/auth/registration', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: serialize(signupSelector),
      });

      const json = await response.json();

      const msg = document.querySelector('.message');
      msg.innerHTML = json.message;
      if (json.message) {
        setTimeout(() => {
          msg.innerHTML = '<a href=\'/auth/login\'>Войти на сайт</a>';
        }, 3000);
      }
      // window.location = '/auth/registration';
    });
  } else {
    return null;
  }
};

export default signup;
