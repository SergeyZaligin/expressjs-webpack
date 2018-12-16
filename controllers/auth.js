const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const is = require('is_js');


module.exports.checkLogin = async (req, res) => {
  const candidate = await User.findOne({
    email: req.body.email,
  });
  console.log('CANDIDATE', candidate);
  if (candidate) {
    const passwordResult = bcryptjs.compareSync(req.body.password, candidate.password);
    if (passwordResult) {
      req.session.nickname = candidate.nickname;
      req.session.userId = candidate._id;
      req.session.role = candidate.role;
      console.log('REQ SESSION', req.session);

      res.status(200).json({
        message: 'Вы вошли на сайт.',
      });
    } else {
      res.status(401).json({
        message: 'Логин или пароль не совпадают',
      });
    }
  } else {
    res.status(404).json({
      message: 'Пользователь не зарегистрирован',
    });
  }
};

/**
 * Logout user
 * @param {*} req
 * @param {*} res
 */
module.exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
};

/**
 * Login page
 * @param {*} req
 * @param {*} res
 */
module.exports.login = (req, res) => {
  const nickname = req.session.nickname;
  const userId = req.session.userId;
  const role = req.session.role;

  res.render('auth/login', {
    title: 'Вход на сайт',
    meta: {
      description: 'Вход на сайт',
      keywords: 'Вход на сайт',
    },
    user: {
      userId,
      nickname,
      role,
    },
  });
};

module.exports.signup = async (req, res) => {
  console.log('Body', req.body);

  const entityMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#39;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  const escapeHtml = (string) => {
    return String(string).replace(/[&<>"'`=\/]/g, (s) => {
      return entityMap[s];
    });
  };

  const email = escapeHtml(req.body.email.trim());
  const nickname = escapeHtml(req.body.nickname.trim());
  const password = escapeHtml(req.body.password.trim());
  const repassword = escapeHtml(req.body.repassword.trim());
  const role = escapeHtml(req.body.role.trim());

  const user = {
    email,
    nickname,
    password,
    repassword,
    role,
  };

  console.log('USER=>', user);

  const errorsValidation = {
    errors: [],
  };


  if (req.body) {
    if (is.empty(user.email) || is.space(user.email)) {
      errorsValidation.errors.push('Поле Email обязательно для заполнения.');
    } else {
      const candidate = await User.findOne({
        email: user.email,
      });

      console.log('candidate', candidate);

      if (candidate) {
        errorsValidation.errors.push('Данная почта уже используется.');
      }
    }

    if (is.empty(user.nickname) || is.space(user.nickname)) {
      errorsValidation.errors.push('Поле имя обязательно для заполнения.');
    }

    if (is.empty(user.password) || is.space(user.password)) {
      errorsValidation.errors.push('Поле пароль обязательно для заполнения.');
    }

    if (user.password !== user.repassword) {
      errorsValidation.errors.push('Пароли не совпадают.');
    }

    if (is.empty(user.role) || is.space(user.role) || user.role === 'admin') {
      user.role = 'register';
    }

    if (errorsValidation.errors.length > 0) {
      res.status(400).send({
        message: errorsValidation.errors,
      });
    } else {
      try {
        const salt = bcryptjs.genSaltSync(10);

        const validUser = new User({
          nickname: user.nickname,
          email: user.email,
          password: bcryptjs.hashSync(user.password, salt),
          role: user.role,
        });

        const res = await validUser.save();
        console.log('res', res);
      } catch (error) {
        console.log(error);
      }
      res.status(200).send({
        message: ['Вы успешно зарегистрированы!'],
      });
    }
  }
};

/**
 * Registration page
 * @param {*} req
 * @param {*} res
 */
module.exports.registration = (req, res) => {
  res.render('auth/registration', {
    title: 'Регистрация',
    meta: {
      description: 'Регистрация',
      keywords: 'Регистрация',
    },
  });
};