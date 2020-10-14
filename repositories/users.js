const crypto = require('crypto');
const util = require('util');
const Repo = require('./repo');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepo extends Repo {
  async create(attr) {
    //attr = {emial :'asdsadasdasdasdas' pass:"asdsadsad " ....}
    attr.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const hashed = await scrypt(attr.password, salt, 64);
    const record = {...attr, password: `${hashed.toString('hex')}.${salt}`};
    const records = await this.getAll();
    records.push(record);
    //write back to useres.json
    await this.writeAll(records);
    return record;
  }
  async compre(suppliedPsw, savedPsw) {
    //savedPsw > passwd saved in data base
    //suppliedPsw passwd from website form
    const [hash, salt] = savedPsw.split('.');
    const hashSupply = await scrypt(suppliedPsw, salt, 64);

    return hash === hashSupply.toString('hex');
  }
}
// const test = async () => {
//   const usrsRep = new UsersRepo('users.json');
//   //   await usrsRep.create({email: 'test1@js.com', password: '123456'});
//   //   const user = await usrsRep.getOne('f6cbaffb');
//   //   const remove = await usrsRep.delete('f392f57c');
//   // await usrsRep.update('036b07f7', {password: 'dupadua'});
//   const user = await usrsRep.getOneBy({email: 'test4@js.com'});
//   console.log(user);
// };

// test();

module.exports = new UsersRepo('users.json');
