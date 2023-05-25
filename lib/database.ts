import sqlite3 from "sqlite3";
import * as sqlite from "sqlite";

export class Database {
  // public db;
  constructor() {
    // this.db = new sqlite3.Database("database.db");
  }

  async connect() {
    return await sqlite.open({
      filename: "../database.db",
      driver: sqlite3.Database,
    });
  }
}
