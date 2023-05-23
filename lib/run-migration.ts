import { connect } from "http2";
import { Database } from "./database";

async function runMigration() {
  const db = await new Database().connect();
  await db.migrate({ force: true });

  // const notes = await db.all("SELECT * FROM todo");
  // console.log(JSON.stringify(notes, null, 1));
  db.close();
}

runMigration();
