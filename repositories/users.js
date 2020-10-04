const fs = require('fs');

class UsersRepo {
  constructor(filename) {
    if (!filename) {
      throw new Error('provide a filename');
    }
    this.filename = filename;
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    //open fil
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async create(attr) {
    //attr = {emial :'asdsadasdasdasdas' pass:"asdsadsad " ....}
    const records = await this.getAll();
    records.push(attr);
    //write back to useres.json
    await this.writeAll(records);
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }

  randomId() {}
}
const test = async () => {
  const usrsRep = new UsersRepo('users.json');
  await usrsRep.create({email: 'test1@js.com', password: '123456'});
  const users = await usrsRep.getAll();
  console.log(users);
};

test();
