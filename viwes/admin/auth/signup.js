const layout = require('../layout');

module.exports = ({req}) => {
  return layout({
    content: `
  <div>
  <h1>Your ID: ${req.sessionID} </h1>
  <form method="POST">
    <input type="text" name="email" placeholder="email" id="" />
    <input type="text" name="password" placeholder="password" id="" />
    <input type="text" name="confirm" placeholder="confirm" id="" />
    <button>Sing UP!</button>
  </form>
</div>
  `,
  });
};
