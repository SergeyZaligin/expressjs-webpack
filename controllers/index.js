module.exports.index = (req, res) => {
  console.log('INDEX PAGE SESSION', req.session);
  const nickname = req.session.nickname;
  const id = req.session.id;
  const role = req.session.role;

  res.render('index', {
    title: 'Главная страница',
    meta: {
      description: 'Главная страница',
      keywords: 'Главная страница',
    },
    user: {
      id,
      nickname,
      role,
    },
  });
};
