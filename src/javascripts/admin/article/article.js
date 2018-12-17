import App from '../../base/App';

class Article extends App {
  constructor() {
    super(
        '#article-add-form',
        '/admin/post/add'
    );
  }
}

export default Article;
