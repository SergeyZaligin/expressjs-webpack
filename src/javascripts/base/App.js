import {
  serialize,
} from '../libs/jDi';

class App {
  constructor() {
    this.selector = null;
    this.url = '';
  }
  //  '/admin/post/category/add'
  add(element) {
    this.selector = document.querySelector(element);
    this.selector.addEventListener('submit', async function(e) {
      e.preventDefault();
      console.log(serialize(this));
      const response = await fetch(this.url, {
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
