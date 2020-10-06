const fs = require('fs');
const crypto = require('crypto');

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
    attr.id = this.randomId();
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

  randomId() {
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const records = await this.getAll();
    return await records.find((record) => record.id === id);
  }
  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    this.writeAll(filteredRecords);
  }

  async update(id, attr) {
    //get all
    const records = await this.getAll();
    //find selected record
    const record = await records.find((record) => record.id === id);
    console.log(records);
    console.log(record);
    if (!record) {
      throw new Error('record not found!');
    }
    Object.assign(record, attr);
    await this.writeAll(records);
  }

  async getOneBy(filtres) {
    const records = await this.getAll();
    for (let record of records) {
      let found = true;

      for (let key in filtres) {
        if (record[key] !== filtres[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}
const test = async () => {
  const usrsRep = new UsersRepo('users.json');
  //   await usrsRep.create({email: 'test1@js.com', password: '123456'});
  //   const user = await usrsRep.getOne('f6cbaffb');
  //   const remove = await usrsRep.delete('f392f57c');
  // await usrsRep.update('036b07f7', {password: 'dupadua'});
  const user = await usrsRep.getOneBy({email: 'test4@js.com'});
  console.log(user);
};

test();
