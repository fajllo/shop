const layout = require('../layout');
const {getError} = require('../../helpers');

module.exports = ({req, errors}) => {
  return layout({
    content: `
  <div>
  <h1>Your ID: ${req.sessionID} </h1>
  <form method="POST">
    <input type="text" name="email" placeholder="email" id="" />
    <input type="text" name="password" placeholder="password" id="" />
    <input type="text" name="confirm" placeholder="confirm" id="" />
    <button>Sing UP!</button>
    <h1>${getError(errors, 'email')}</h1>
    <h1>${getError(errors, 'password')}</h1>
    <h1>${getError(errors, 'confirm')}</h1>
  </form>
</div>
  `,
  });
};
