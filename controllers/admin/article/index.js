const Post = require('../../../models/article/Post');
const Category = require('../../../models/article/Category');
const transliterate = require('transliterate-cyrillic-text-to-latin-url');
const validator = require('validator');

// begin Page admin add article
module.exports.addPostPage = async (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  try {
    const categories = await Category.find();
    console.log(categories);
    res.render('admin/article/add', {
      title: 'Административная панель - добавить статью',
      meta: {
        description: 'Административная панель - добавить статью',
        keywords: 'Административная панель - добавить статью',
      },
      user: {
        userId,
        nickname,
        role,
      },
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addPost = async (req, res) => {
  // console.log(req.file);
  // console.log(req.body);
  const visible = Boolean(req.body.visible);
  const title = validator.escape(validator.trim(req.body.title));
  const slug = req.body.slug ? validator.escape(validator.trim(req.body.slug)) : validator.escape(validator.trim(transliterate(req.body.title)));
  const description = validator.escape(validator.trim(req.body.description));
  const keywords = validator.escape(validator.trim(req.body.keywords));
  const seopreview = validator.escape(req.body.seopreview);
  const preview = validator.escape(req.body.preview);
  const text = validator.escape(req.body.text);
  const category = validator.escape(req.body.category);
  const user = req.session.userId;
  const sort = parseInt(req.body.sort);
  const thumbnail = req.file ? req.file.path : '';
  console.log('PATH', req.body);
  let isThumbnail = req.body.isThumbnail;

  if (thumbnail) {
    isThumbnail = true;
  }
  if (validator.isMongoId(user)) {
    console.log('Yes is it mongoID');
  }

  const post = {
    visible,
    title,
    slug,
    description,
    keywords,
    seopreview,
    preview,
    text,
    category,
    user,
    sort,
    thumbnail,
    isThumbnail,
  };

  console.log('POST ADD ===>', post);

  try {
    const validPost = new Post({
      visible: post.visible,
      title: post.title,
      slug: post.slug,
      description: post.description,
      keywords: post.keywords,
      seopreview: post.seopreview,
      preview: post.preview,
      text: post.text,
      category: post.category,
      user: post.user,
      sort: post.sort,
      thumbnail: post.thumbnail,
      isThumbnail: post.isThumbnail,
    });

    const res = await validPost.save();
    console.log('res', res);
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    message: 'Миниатюра успешно загружена на сервер в папку article/thumbnail!',
  });
};
// end Page admin add article


// begin Page admin update article
module.exports.updatePostPage = (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  res.render('admin/article/update', {
    title: 'Административная панель - обновить статью',
    meta: {
      description: 'Административная панель - обновить статью',
      keywords: 'Административная панель - обновить статью',
    },
    user: {
      userId,
      nickname,
      role,
    },
  });
};

module.exports.updatePost = (req, res) => {

};
// end Page admin update article


// begin Page admin list article
module.exports.listPostPage = (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  res.render('admin/article/list', {
    title: 'Административная панель - все статеи',
    meta: {
      description: 'Административная панель - все статеи',
      keywords: 'Административная панель - все статеи',
    },
    user: {
      userId,
      nickname,
      role,
    },
  });
};
// end Page admin list article
