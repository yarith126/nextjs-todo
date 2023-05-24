import { NextResponse, NextRequest } from "next/server";
import { Database } from "@/lib/database";
import { Todo } from "@/lib/todo-model";
import { v4 as uuidv4 } from "uuid";
import { ErrorResponse } from "@/lib/todo-api-helper";
import moment from "moment";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";

  const db = await new Database().connect();
  const todos = await db.all("SELECT * FROM todo WHERE task LIKE ?", `%${q}%`);
  db.close();

  return NextResponse.json({ data: todos });
}

/**
 * Save a todo
 *
 * Just pass "task" (type string) in form data and you're all set.
 */
export async function POST(req: NextRequest) {
  let todo: Todo | null;
  try {
    const date = moment().format("YYYY-MM-DD HH:MM:S");
    const formData = await req.formData();
    formData.set("id", "");
    formData.set("uuid", uuidv4());
    formData.set("isCompleted", "false");
    formData.set("lastUpdatedAt", date);
    todo = Todo.fromFormData(formData);
  } catch (err) {
    return ErrorResponse.Todo400ParseFail();
  }

  if (todo == null) return ErrorResponse.Todo400BadRequest();

  const db = await new Database().connect();
  await db.run(
    `
    INSERT INTO todo (uuid, task, isCompleted, lastUpdatedAt)
    VALUES (?, ?, ?, ?);
    `,
    [todo.uuid, todo.task, todo.isCompleted, todo.lastUpdatedAt]
  );
  db.close();

  return NextResponse.json({ message: "success" });
}
