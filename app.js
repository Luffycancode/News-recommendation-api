const express = require('express');
const app = express();
const port=process.env.PORT;
const userroute=require("./routes/userroute")


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(['/','/home'],userroute)
app.use(['/register','/users/signup'],userroute)
app.use(['/login','/users/login'],userroute)
app.use('/users',userroute)


module.exports = app;