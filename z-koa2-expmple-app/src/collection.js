const db = require('ioredis')();

class Collection {
  constructor(json) {
    this.name = json.name;
    this.attributes = json.attributes;
    this.groupBy = json.groupBy;
  }

  async countBy(attr, val) {
    const count = await db
      .hget(`${this.name}_by_${attr}`, val);
    return Number(count);
  }

  async count() {
    const count = await db
      .zcount(`${this.name}`, '-inf', '+inf');
    return Number(count);
  }

  async add(event) {
    await db
      .zadd(`${this.name}`, 1, JSON.stringify(event));

    await this._incrGroups(event);
  }

  // async _incrGroups(event) {
  //   for(let attr of this.groupBy) {
  //     await db.hincrby(`${this.name}_by_${attr}`, event[attr], 1);
  //   }
  // }
  async _incrGroups(event) {
    const promises = this.groupBy.map(attr =>
      db.hincrby(`${this.name}_by_${attr}`, event[attr], 1));
    await Promise.all(promises);
  }

  async clear() {
    await db.del(`${this.name}`);
    for(let attr of this.groupBy) {
      await db.del(`${this.name}_by_${attr}`);
    }
  }
}

export default Collection;
