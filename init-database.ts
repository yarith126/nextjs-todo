const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");

async function setup() {
  const db = await sqlite.open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });
  await db.migrate({ force: true });

  const notes = await db.all("SELECT * FROM Note");
  console.log(JSON.stringify(notes, null, 1));
}

setup();
