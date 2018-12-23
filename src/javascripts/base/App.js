import {
  serialize,
} from '../libs/jDi';

class App {
  constructor(
      addSelector = '',
      addUrl = '',
      updateSelector = '',
      updateUrl = '',
      deleteSelector = '',
      deleteUrl = '') {
    this.addSelector = addSelector;
    this.addUrl = addUrl;
    this.updateSelector = updateSelector;
    this.updateUrl = updateUrl;
    this.deleteSelector = deleteSelector;
    this.deleteUrl = deleteUrl;
  }

  //  '/admin/post/category/add'
  add() {
    const el = document.querySelector(this.addSelector);
    const addUrl = this.addUrl;
    if (el) {
      el.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log(serialize(this));
        try {
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
        } catch (error) {
          console.log(error);
        }


        // const msg = document.querySelector('.message');
        // msg.innerHTML = json.message;
        // if (json.message) {
        //   setTimeout(() => {
        //     msg.innerHTML = '<a href=\'/auth/category\'>На главную</a>';
        //   }, 3000);
        // }
        // window.location = '/auth/category';
      });
    } else {
      return;
    }
  }

  addMultipart() {
    const el = document.querySelector(this.addSelector);
    const addUrl = this.addUrl;
    console.log('el', el);
    console.log('addUrl', addUrl);
    if (el) {
      el.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formEntries = new FormData(this);
        await fetch(addUrl, {
          method: 'post',
          body: formEntries,
        });
      });
    } else {
      return;
    }
  }

  update() {
    const el = document.querySelector(this.updateSelector);
    const updateUrl = this.updateUrl;
    console.log('el', el);
    console.log('updateUrl', updateUrl);
    if (el) {
      el.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formEntries = new FormData(this);
        await fetch(updateUrl, {
          method: 'POST',
          body: formEntries,
        });
      });
    } else {
      return;
    }
  }

  delete() {
    const el = document.querySelectorAll(this.deleteSelector);
    const deleteUrl = this.deleteUrl;
    console.log('el', el);
    console.log('deleteUrl', deleteUrl);
    if (el) {
      el.forEach((item) => {
        item.addEventListener('submit', async function(e) {
          e.preventDefault();
          const response = await fetch(deleteUrl, {
            method: 'POST',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: serialize(this),
          });
          console.log('rem el', this.parentNode.parentNode);
          this.parentNode.parentNode.remove();
          const json = await response.json();
          console.log(json);
        });
      });
    } else {
      return;
    }
  }
}

export default App;
