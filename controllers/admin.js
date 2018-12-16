const transliterate = require('transliterate-cyrillic-text-to-latin-url');

module.exports.index = (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  res.render('admin/index', {
    title: 'Административная панель',
    meta: {
      description: 'Административная панель',
      keywords: 'Административная панель',
    },
    user: {
      userId,
      nickname,
      role,
    },
  });
};

// begin Page admin add article
module.exports.addPostPage = (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

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
  });
};

module.exports.addPost = (req, res) => {

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

module.exports.addCategoryPost = (req, res) => {
  const visible = req.body.visible;
  const name = req.body.name;
  const slug = req.body.slug ? req.body.slug : transliterate(req.body.name);
  const description = req.body.description;
  const keywords = req.body.keywords;
  const sort = req.body.sort;
  const user = req.session.userId;

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


  // try {
  //   const salt = bcryptjs.genSaltSync(10);

  //   const validUser = new User({
  //     nickname: user.nickname,
  //     email: user.email,
  //     password: bcryptjs.hashSync(user.password, salt),
  //     role: user.role,
  //   });

  //   const res = await validUser.save();
  //   console.log('res', res);
  // } catch (error) {
  //   console.log(error);
  // }
  // res.status(200).send({
  //   message: ['Вы успешно зарегистрированы!'],
  // });
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
