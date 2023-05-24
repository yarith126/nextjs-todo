import { Database } from "@/lib/database";
import { ErrorResponse } from "@/lib/todo-api-helper";
import { Todo } from "@/lib/todo-model";
import { NextRequest, NextResponse } from "next/server";
import { params } from "@/lib/type-alias";
import moment from "moment";

export async function GET({}, { params }: params) {
  const db = await new Database().connect();
  let todo = await db.get("SELECT * FROM todo WHERE id = ?", params.id);
  db.close();

  return NextResponse.json({ data: todo });
}

export async function PUT(req: NextRequest, { params }: params) {
  const db = await new Database().connect();
  const row = await db.get("SELECT * FROM todo WHERE id = ?", params.id);

  if (row === undefined) {
    db.close();
    return ErrorResponse.Todo404NotFound();
  }

  const id = row.id;
  let task;
  let isCompleted = row.isCompleted;
  const lastUpdatedAt = moment().format("YYYY-MM-DD H:mm:ss");
  try {
    let formData = await req.formData();
    task = formData.get("task") ?? row.task;
    isCompleted = formData.get("isCompleted") ?? row.isCompleted;
    isCompleted = isCompleted == "true" ? "true" : "false";
  } catch (err) {
    return ErrorResponse.Todo400ParseFail();
  }

  await db.run(
    `
    UPDATE todo
    SET task = ?,
        isCompleted = ?,
        lastUpdatedAt = ?
    WHERE id=?
    `,
    [task, isCompleted, lastUpdatedAt, id]
  );
  db.close();

  return NextResponse.json({ message: "success" });
}

export async function DELETE({}, { params }: params) {
  const db = await new Database().connect();
  const row = await db.get("SELECT * FROM todo WHERE id = ?", params.id);

  if (row === undefined) {
    db.close();
    return ErrorResponse.Todo404NotFound();
  }

  await db.run("DELETE FROM todo WHERE id = ?", params.id);
  db.close();

  return NextResponse.json({ message: "success" });
}
