
//for authentication purposes

const express = require('express');
const router = express.Router();

const {
	HandleUserSignup,
	HandleUserLogin
} = require('../controllers/user');

router.get('/signup', (req, res) => {
	res.render('signup', {
		name: '',
		email: '',
		error: null,
		success: null
	});
});

router.get('/login', (req, res) => {
	res.render('login', {
		email: '',
		error: null,
		success: null
	});
});

router.post('/signup', HandleUserSignup);
router.post('/login', HandleUserLogin);

module.exports = router;
