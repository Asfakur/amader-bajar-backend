const config = require("config");

module.exports = function (req, res, next) {

    if (!config.get("requiresAuth")) return next();
    //it will be executed after auth middleware function

    if (req.user.userType !== 'admin') return res.status(403).send('Access denied.');

    next();
}