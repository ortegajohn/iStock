const express = require('express');
const expressRouter = express.Router();
const { isLoggedIn } = require('../lib/helper_auth');

expressRouter.get('/', isLoggedIn, (req, res) => {
    res.render('index');
});

module.exports = expressRouter;