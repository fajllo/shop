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
  // get accset to data send
  req.on('data', (data) => {
    const parsed = data.toString('utf8').split('&');
    let formData = {};
    for (let pair of parsed) {
      let [key, value] = pair.split('=');
      formData[key] = value;
    }
    console.log(formData);
  });

  res.send('Account created!');
});
app.listen(3000, () => {
  console.log('listening dude');
});
