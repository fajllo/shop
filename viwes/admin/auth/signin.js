module.exports = ({req}) => {
  return `
    <div>
    <form method="POST">
      <input type="text" name="email" placeholder="email" id="" />
      <input type="text" name="password" placeholder="password" id="" />
      <button>Sing in!</button>
    </form>
  </div>
      `;
};
