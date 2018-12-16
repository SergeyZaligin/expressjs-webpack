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
