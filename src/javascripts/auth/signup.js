const signup = (selector) => {
  const signupSelector = document.querySelector(selector);

  if (signupSelector) {
    signupSelector.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formEntries = new FormData(signupSelector).entries();
      const dataForm = JSON.stringify(Object.assign(...Array.from(formEntries, ([x, y]) => ({[x]: y}))));
      console.log('dataForm', dataForm);
      const response = await fetch('/auth/registration', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: dataForm,
      });

      const json = await response.json();

      const msg = document.querySelector('.message');
      msg.innerHTML = json.message;
      if (json.message) {
        setTimeout(()=>{
          msg.innerHTML = '<a href=\'/auth/login\'>Войти на сайт</a>';
        }, 5000);
      }
      // window.location = '/auth/registration';
    });
  } else {
    return null;
  }
};

export default signup;
