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
