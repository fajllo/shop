const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: []}));

app.get('/', (req, res) => {
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

app.post('/', async (req, res) => {
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

  res.send('Account created!');
});

app.listen(3000, () => {
  console.log('listening dude');
});
