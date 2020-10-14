const layout = require('../layout');
const {getError} = require('../../helpers');

module.exports = ({req, errors}) => {
  return layout({
    content: `
  <div>
  <form method="POST">
    <input type="text" name="email" placeholder="email" id="" />
    <input type="text" name="password" placeholder="password" id="" />
    <button>Sing in!</button>
  </form>
  <h1>${getError(errors, 'email')}</h1>
  <h1>${getError(errors, 'password')}</h1>
</div>
    `,
  });
};
