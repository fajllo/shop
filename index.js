const express = require('express');

const app = express();

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

app.post('/', (req, res) => {
  res.send('Account created!');
});
app.listen(3000, () => {
  console.log('listening dude');
});
