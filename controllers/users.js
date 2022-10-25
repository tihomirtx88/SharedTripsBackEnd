const { isGuest } = require("../middleware/guards");
const { register, login, logout } = require("../services/userService");
const mapErrors = require("../util/mapers");

const router = require(`express`).Router();

router.post(`/register`,isGuest(), async(req, res) => {
    try {     
        if (req.body.password.trim() == `` || req.body.email.trim() == ``) {
            throw new Error(`Email and password are required!!!`);
        } 
        const user = await register(req.body.email.trim().toLowerCase(), req.body.password.trim(), req.body.gender.trim().toLowerCase());
        res.status(201).json(user);
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({message: errors});
    }  
});
//done register

router.post(`/login`,isGuest(), async(req, res) => {
    try {     
        const user = await login(req.body.email.trim().toLowerCase(), req.body.password.trim());
        res.status(200).json(user);
        
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({message: errors});
    }  
});
//done login

router.get(`/logout`, (req, res) => {
    logout(req.user?.token);
    res.status(204).end();
});

module.exports = router;