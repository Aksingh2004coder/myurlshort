
const users = new Map();

const setUser = async (user) => {
	const { v4: createUid } = await import('uuid');
	const uid = createUid();

	users.set(uid, user);
	return uid;
};

const getUser = (uid) => {
	return users.get(uid);
};

module.exports = {
	setUser,
	getUser
};