const express = require('express');
const expressRouter = express.Router();
const { isLoggedIn } = require('../lib/helper_auth');

expressRouter.get('/api/getuserid', isLoggedIn, (req, res) => {
    console.log("req.user.username",req.user.username)
    console.log("req.user.id",req.user.id)
    var send = {
        username:req.user.username,
        userid: req.user.id
    }
    res.json(send);
    

});

expressRouter.get('/', isLoggedIn, (req, res) => {
    res.render("index");
    

});
module.exports = expressRouter;





