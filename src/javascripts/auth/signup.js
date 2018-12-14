const signup = (selector) => {
  selector = document.querySelector(selector);
  if (selector) {
    selector.addEventListener('submit', (e) => {
      e.preventDefault();
      const formEntries = new FormData(selector).entries();
      const dataForm = JSON.stringify(Object.assign(...Array.from(formEntries, ([x, y]) => ({[x]: y}))));

      fetch('/auth/registration', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: dataForm,
      }).then(function(res) {
        return res.json();
      }).then(function(data) {
        const msg = document.querySelector('.message');

        // msg.innerHTML = data.message;
        data.message.forEach(function(item, i) {
          const newLi = document.createElement('li');
          newLi.innerHTML = `<li>${i}. ${item}</li>`;
          msg.appendChild(newLi);
        });
        // window.location = "/auth/registration";
        console.log(data);
      });
    });
  } else {
    return null;
  }
};

export default signup;
