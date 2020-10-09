const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const usersRepo = require('./repositories/users');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//encrypting cookies
app.use(session({secret: 'secret,shhhh!', resave: false}));
app.use(cookieParser());

app.get('/singup', (req, res) => {
  res.send(`   
 <div>
  
  <form method="POST">
    <input type="text" name="email" placeholder="email" id="" />
    <input type="text" name="password" placeholder="password" id="" />
    <input type="text" name="confirm" placeholder="confirm" id="" />
    <button>Sing UP!</button>
  </form>
</div>`);
});

app.post('/singup', async (req, res) => {
  // get accset to data send
  // console.log(req.body);
  const {email, password, confirm} = req.body;
  const exisitingUser = await usersRepo.getOneBy({email: email});
  if (exisitingUser) {
    return res.send('user already exist!');
  }
  if (password !== confirm) {
    return res.send('passw must be the same!');
  }
  //create user in our repo
  const user = await usersRepo.create({email, password});
  // added by cookie session
  // req.session === {
  res.session = user.id;

  res.send('Account created!');
});
app.get('/signin', (req, res) => {
  res.send(`   
  <div>
   <form method="POST">
     <input type="text" name="email" placeholder="email" id="" />
     <input type="text" name="password" placeholder="password" id="" />
     <button>Sing in!</button>
   </form>
 </div>`);
});

app.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  const user = await usersRepo.getOneBy({email});
  if (!user) {
    res.send('email not found');
  }
  const validPsw = await usersRepo.compre(password, user.password);
  if (!validPsw) {
    res.send('invalid combination ');
  }

  res.send('you are singed in');
  res.session = user.id;
});

app.get('/singout', (req, res) => {
  req.session = null;
  res.send('logged out!');
});

app.listen(3000, () => {
  console.log('listening dude');
});
