import App from '../../../base/App';

class Category extends App {
  constructor() {
    super(
        '#article-category-add-form',
        '/admin/post/category/add'
    );
  }
}

export default Category;
