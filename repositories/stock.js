const Repo = require('./repo');

class Stock extends Repo {}

module.exports = new Stock('stock.json');
