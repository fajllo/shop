const fs = require('fs');

class UsersRepo {
  constructor(filename) {
    if (!filename) {
      throw new Error('provide a filename');
    }
    this.filename = filename;
    try {
      false.accesSync(this.filename);
    } catch (e) {
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
}
const test = async () => {
  const usrsRep = new UsersRepo('users.json');
  await usrsRep.create({email: 'test@js.com', password: '123456'});
  const users = await usrsRep.getAll();
  console.log(users);
};

test();
