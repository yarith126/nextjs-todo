import { Database } from "./database";

async function runMigration() {
  const db = await new Database().connect();
  await db.migrate({ force: true });

  // const todos = await db.all("SELECT * FROM todo");
  // console.log(JSON.stringify(todos, null, 1));
  db.close();
}

runMigration();
