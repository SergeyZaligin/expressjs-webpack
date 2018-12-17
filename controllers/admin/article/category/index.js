const Category = require('../../../../models/article/Category');
const transliterate = require('transliterate-cyrillic-text-to-latin-url');
const validator = require('validator');

// begin Page admin add article category
module.exports.addCategoryPostPage = (req, res) => {
  res.render('admin/article/category/add', {
    title: 'Административная панель - добавить категорию к статьям',
    meta: {
      description: 'Административная панель - добавить категорию к статьям',
      keywords: 'Административная панель - добавить категорию к статьям',
    },
  });
};

module.exports.addCategoryPost = async (req, res) => {
  const visible = Boolean(req.body.visible);
  const name = validator.escape(validator.trim(req.body.name));
  const slug = req.body.slug ? validator.escape(validator.trim(req.body.slug)) : validator.escape(validator.trim(transliterate(req.body.name)));
  const description = validator.escape(validator.trim(req.body.description));
  const keywords = validator.escape(validator.trim(req.body.keywords));
  const sort = parseInt(req.body.sort);
  const user = req.session.userId;

  if (validator.isMongoId(user)) {
    console.log('Yes is it mongoID');
  }

  const category = {
    visible,
    name,
    slug,
    description,
    keywords,
    sort,
    user,
  };

  console.log('CATEGORY ADD ===>', category);

  try {
    const validCategory = new Category({
      visible: category.visible,
      name: category.name,
      slug: category.slug,
      description: category.description,
      keywords: category.keywords,
      sort: category.sort,
      user: category.user,
    });

    const res = await validCategory.save();
    console.log('res', res);
  } catch (error) {
    console.log(error);
  }
  res.status(200).send({
    message: ['Категория создана успешно!'],
  });
};
// end Page admin add article category

// begin Page admin update article category
module.exports.updateCategoryPostPage = (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  res.render('admin/article/category/update', {
    title: 'Административная панель - обновить категорию к статьям',
    meta: {
      description: 'Административная панель - обновить категорию к статьям',
      keywords: 'Административная панель - обновить категорию к статьям',
    },
    user: {
      userId,
      nickname,
      role,
    },
  });
};

module.exports.updateCategoryPost = (req, res) => {

};
// end Page admin update article category

// begin Page admin list article category
module.exports.listCategoryPostPage = (req, res) => {
  res.render('admin/article/category/list', {
    title: 'Административная панель - все категории статей',
    meta: {
      description: 'Административная панель - все категории статей',
      keywords: 'Административная панель - все категории статей',
    },
  });
};
// end Page admin list article category
