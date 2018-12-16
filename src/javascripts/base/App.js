import {
  serialize,
} from '../libs/jDi';

class App {
  constructor(addSelector, addUrl) {
    this.addSelector = addSelector;
    this.addUrl = addUrl;
  }

  //  '/admin/post/category/add'
  add() {
    const el = document.querySelector(this.addSelector);
    const addUrl = this.addUrl;
    el.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log(serialize(this));
      const response = await fetch(addUrl, {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: serialize(this),
      });

      const json = await response.json();
      console.log(json);
      // const msg = document.querySelector('.message');
      // msg.innerHTML = json.message;
      // if (json.message) {
      //   setTimeout(() => {
      //     msg.innerHTML = '<a href=\'/auth/category\'>На главную</a>';
      //   }, 3000);
      // }
      // window.location = '/auth/category';
    });
  }
}

export default App;
