const express = require("express");
const userRouter = express.Router();
const { login , signup } = require("../controller/user");


userRouter.post('/login', login);

userRouter.get('/login', (req, res) => {
    res.render('pages/auth/login');
  });

userRouter.post('/signup', signup);

userRouter.get('/signup', (req, res) => {
    res.render('pages/auth/signup');
});


module.exports = userRouter;