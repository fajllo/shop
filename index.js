const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRouter = require('./routs/admin/auth');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//encrypting cookies
app.use(session({secret: 'secret,shhhh!', resave: false}));
app.use(cookieParser());

app.use(authRouter);

app.listen(3000, () => {
  console.log('listening dude');
});
