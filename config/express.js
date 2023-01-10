const express = require(`express`);
const auth = require("../middleware/auth");
// const cors = require(`../middleware/cors`);
const cors = require('cors')

module.exports = (app) => {
    app.use(cors())
    app.use(auth());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
}

   