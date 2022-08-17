const express = require('express');
const app = express();
const port = 3620;
const ejs = require ('ejs')
const userRouter = require("./routers/user");
const mongoose = require('mongoose');
              
app.use(express.json());

app.use("/user", userRouter);

app.set('view engine', 'ejs');

app.use( express.static( "assets" ) );


mongoose.connect('mongodb://vatsalk:ejnDb0zn54HqoEXrchNCISC54Ku4@15.206.7.200:28017/vatsalk?authSource=admin&ssl=false').then(() => {
    console.log("Database connected ...");    
}).catch(err => {
    console.log('err :: ', err);
});

app.get('/home', (req, res) => {
  res.render('pages/home/home');
  });

app.listen (port, () => {
    console.log(`Port is ready to start ${port}!`)
});