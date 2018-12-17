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

  const post = {
    visible,
    name,
    slug,
    description,
    keywords,
    sort,
    user,
  };

  console.log('POST ADD ===>', post);

  // try {
  //   const validCategory = new Category({
  //     visible: category.visible,
  //     name: category.name,
  //     slug: category.slug,
  //     description: category.description,
  //     keywords: category.keywords,
  //     sort: category.sort,
  //     user: category.user,
  //   });

  //   const res = await validCategory.save();
  //   console.log('res', res);
  // } catch (error) {
  //   console.log(error);
  // }
  res.status(200).send({
    message: ['Категория создана успешно!'],
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
