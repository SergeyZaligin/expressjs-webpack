module.exports.index = (req, res) => {
//   const nickname = req.session.nickname;
//   const userId = req.session.userId;
//   const role = req.session.role;

  res.render('index', {
    title: 'Главная страница',
    meta: {
      description: 'Главная страница',
      keywords: 'Главная страница',
    },
    // user: {
    //   userId,
    //   nickname,
    //   role,
    // },
  });
};
