module.exports.guardAdminRoutes = (req, res, next) => {
    const role = req.session.role;
    if (role !== 'admin') {
        res.redirect('/');
    }
    next();
};

module.exports.guardRegisterRoutes = (req, res, next) => {
    const role = req.session.role;
    if (role !== 'register') {
        res.redirect('/');
    }
    next();
};