const fs = require('fs');
const crypto = require('crypto');
module.exports = class Repo {
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
  async create(attr) {
    attr.id = this.randomId();
    const records = await this.getAll();
    records.push(attr);
    await this.writeAll(records);
    return attr;
  }

  async getAll() {
    //open fil
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
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
};
