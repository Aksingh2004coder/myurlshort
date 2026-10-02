
const { getUser } = require('../services/auth');

const authMiddleware = (req, res, next) => {
	const user = getUser(req.cookies.uid);

	if (!user) {
		return res.redirect('/user/login');
	}

	req.user = user;
	next();
};

module.exports = authMiddleware;