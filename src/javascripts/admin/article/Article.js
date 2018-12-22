import App from '../../base/App';

class Article extends App {
  constructor() {
    super(
        '#article-add-form',
        '/admin/post/add',
        '#article-update-form',
        '/admin/post/update/5c1911f7e022a718e15e6e74'
    );
  }
}

export default Article;
