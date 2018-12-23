import App from '../../base/App';

class Article extends App {
  constructor() {
    super(
        '#article-add-form',
        '/admin/post/add',
        '#article-update-form',
        document.location.pathname,
        '.post-del',
        '/admin/post/list',
    );
  }
}

export default Article;
