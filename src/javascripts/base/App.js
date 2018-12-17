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
        // formEntries.append('visible', this.visible.value);
        // formEntries.append('title', this.title.value);
        // formEntries.append('slug', this.slug.value);
        // formEntries.append('description', this.description.value);
        // formEntries.append('keywords', this.keywords.value);
        // formEntries.append('seopreview', this.seopreview.value);
        // formEntries.append('preview', this.preview.value);
        // formEntries.append('text', this.text.value);
        // formEntries.append('category', this.category.value);
        // formEntries.append('sort', this.sort.value);
        // formEntries.append('thumbnail', this.file);
        console.log(this);
        await fetch(addUrl, {
          method: 'post',
          body: formEntries,
        });
      });
    } else {
      return;
    }
  }
}

export default App;
