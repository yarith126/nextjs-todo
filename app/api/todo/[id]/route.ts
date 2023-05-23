import { Database } from "@/lib/database";
import { ErrorResponse } from "@/lib/todo-api-helper";
import { Todo } from "@/lib/todo-model";
import { NextRequest, NextResponse } from "next/server";
import { params } from "@/lib/type-alias";

export async function GET({}, { params }: params) {
  const db = await new Database().connect();
  let todo = await db.get("SELECT * FROM todo WHERE id = ?", params.id);
  db.close();

  return NextResponse.json({ data: todo });
}

export async function PUT(req: NextRequest, { params }: params) {
  let todo: Todo | null;
  try {
    let formData = await req.formData();
    formData.set("id", params.id.toString());
    todo = Todo.fromFormData(formData);
  } catch (err) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return ErrorResponse.Todo400ParseFail();
  }

  if (todo == null) return ErrorResponse.Todo400BadRequest();

  const db = await new Database().connect();
  const row = await db.get("SELECT * FROM todo WHERE id = ?", todo.id);

  if (row === undefined) {
    db.close();
    return ErrorResponse.Todo404NotFound();
  }

  await db.run(
    `
    UPDATE todo
    SET uuid = ?,
        task = ?,
        isCompleted = ?,
        createdAt = ?
    WHERE id=?
    `,
    [todo.uuid, todo.task, todo.isCompleted, todo.createdAt]
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