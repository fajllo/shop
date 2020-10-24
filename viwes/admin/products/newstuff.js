const layout = require('../layout');
const {getError} = require('../../helpers');
module.exports = ({errors}) => {
  return layout({
    content: `   
      <form action="post">
        <input type="text" placeholder="Title" name="title" />
        <input type="text" placeholder="Price" name="price" />
        <input type="file" name="image" />
        <button>submit!</button>
      </form>`,
  });
};