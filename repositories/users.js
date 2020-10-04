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

  async getAll() {}
}

const usrsRep = new UsersRepo('users.json');
