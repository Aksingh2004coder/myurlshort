const User = require('../models/user');
const { setUser } = require('../services/auth');

const HandleUserSignup = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
		return res.status(400).render('signup', {
			name: name || '',
			email: email || '',
			error: 'Name, email, and password are required',
			success: null
		});
	}

	try {
		await User.create({
			name: name.trim(),
			email: email.trim().toLowerCase(),
			password
		});

		return res.status(201).render('signup', {
			name: '',
			email: '',
			error: null,
			success: 'Account created successfully'
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(409).render('signup', {
				name,
				email,
				error: 'An account with this email already exists',
				success: null
			});
		}

		console.error(error);
		return res.status(500).render('signup', {
			name,
			email,
			error: 'Unable to create account',
			success: null
		});
	}
};

const HandleUserLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).render('login', {
			email: email || '',
			error: 'Email and password are required',
			success: null
		});
	}

	try {
		const user = await User.findOne({
			email: email.trim().toLowerCase()
		});

		if (!user || user.password !== password) {
			return res.status(401).render('login', {
				email,
				error: 'Invalid email or password',
				success: null
			});
		}

		const uid = await setUser({
			id: user._id,
			name: user.name,
			email: user.email
		});

		res.setHeader('Set-Cookie', `uid=${uid}; Path=/; HttpOnly`);
		return res.redirect('/home');
	} catch (error) {
		console.error(error);
		return res.status(500).render('login', {
			email,
			error: 'Unable to log in',
			success: null
		});
	}
};

module.exports = {
	HandleUserSignup,
	HandleUserLogin
};
