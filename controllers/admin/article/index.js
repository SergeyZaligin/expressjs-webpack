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
  let thumbnail = 'uploads/extra/no-image.png';
  if (req.file) {
    thumbnail = req.file.path;
  }

  // if (validator.isMongoId(user)) {
  //   console.log('Yes is it mongoID');
  // }

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
    });

    await validPost.save();
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    message: 'Миниатюра успешно загружена на сервер в папку article/thumbnail!',
  });
};
// end Page admin add article


// begin Page admin update article
module.exports.updatePostPage = async (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  try {
    const post = await Post.find({
      _id: req.params.id,
    });
    const categories = await Category.find();
    console.log(post);
    res.render('admin/article/update', {
      title: `Административная панель - обновить статью ${post[0].title}`,
      meta: {
        description: `Административная панель - обновить статью ${post[0].title}`,
        keywords: `Административная панель - обновить статью ${post[0].title}`,
      },
      user: {
        userId,
        nickname,
        role,
      },
      post,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updatePost = async (req, res) => {
  console.log('UPDATE ARTICLE', req.body);
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
  let thumbnail = 'uploads/extra/no-image.png';

  if (req.file) {
    thumbnail = req.file.path;
  }

  const updated = {
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
  };

  try {
    await Post.findOneAndUpdate({
      _id: req.params.id,
    }, {
      $set: updated,
    }, {
      new: true,
    });
  } catch (error) {
    console.log(error);
  }
  res.status(200).json({
    message: 'Статья успешно обновлена.',
  });
};
// end Page admin update article


// begin Page admin list article
module.exports.listPostPageRedirect = (req, res) => {
  res.redirect('/post/list/', 301);
};

module.exports.listPostPage = async (req, res) => {
  try {
    const perPage = 4;
    const cnt = await Post
        .find({}).countDocuments();
    const paramsPage = +req.params.page;
    if (req.params['0'] === '' || !req.params.length) {
      console.log('NOT PARAMS!!!');
    }
    console.log('req.params', req.params.page);
    let page = paramsPage || 1;
    if (page <= 0) {
      page = 1;
    }
    const pages = Math.ceil(cnt / perPage);
    if (page > pages) {
      page = pages;
    }
    const posts = await Post
        .find({})
        .skip((perPage * page) - perPage)
        .limit(+perPage);
    res.render('admin/article/list', {
      title: 'Административная панель - все статьи',
      meta: {
        description: 'Административная панель - все статьи',
        keywords: 'Административная панель - все статьи',
      },
      posts,
      count: cnt,
      current: page,
      pages,
    });
  } catch (error) {
    console.log(error);
  }
};
// end Page admin list article
