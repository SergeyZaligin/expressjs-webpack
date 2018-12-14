const signup = (selector) => {
  const signupSelector = document.querySelector(selector);

  if (signupSelector) {
    signupSelector.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formEntries = new FormData(signupSelector).entries();
      const dataForm = JSON.stringify(Object.assign(...Array.from(formEntries, ([x, y]) => ({[x]: y}))));

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
      // window.location = '/auth/registration';
      console.log(json);
    });
  } else {
    return null;
  }
};

export default signup;
