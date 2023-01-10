const User = require(`../models/User`);
const { hash, compare } = require(`bcrypt`);
const jwt = require(`jsonwebtoken`);

const JWT_SECRET = `mysupersecretwow`;
const blacklist = [];


async function register(email, password, gender) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error(`Email is taken`);
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        gender
    })

    await user.save();

    return createSession(user);
}

async function login(email, password) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error(`Inccorect email or password`);
    }

    const match = await compare(password, user.hashedPassword);

    if (!match) {
        throw new Error(`Inccorect email or password`);
    }

    return createSession(user);
}

function logout(token) {
    blacklist.push(token);
}

//Identify user by identifier
async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, `i`) });

    return user;
}

function createSession(user) {
    return {
        email: user.email,
        gender: user.gender,
        _id: user._id,
        accessToken: jwt.sign({
            email: user.email,
            gender: user.gender,
            _id: user._id
        }, JWT_SECRET, {expiresIn: `2h`})
    }
}

function verifySession(token) {
    if (blacklist.includes(token)) {
        throw new Error(`Token is invalidated`);
    }

    const payload = jwt.verify(token, JWT_SECRET);

    return {
        email: payload.email,
        gender: payload.gender,
        _id: payload._id,
        token
    }
}

module.exports = {
    login,
    register,
    logout,
    verifySession
}