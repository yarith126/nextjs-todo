import { NextResponse, NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { ErrorResponse } from "@/lib/todo-api-helper";
import prisma from "@/lib/prisma";

/**
 * Get all todo
 *
 * Use url parameter "q" to filter result
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";

  const todos = await prisma.todo.findMany({
    where: {
      task: { contains: q },
    },
  });

  return NextResponse.json({ data: todos });
}

/**
 * Save a todo
 *
 * Just pass "task" (type string) in form data and you're all set.
 */
export async function POST(req: NextRequest) {
  let task: string | undefined;
  try {
    task = (await req.formData()).get("task")?.toString();
  } catch (err) {
    return ErrorResponse.Todo400ParseFail();
  }

  if (task === undefined || task == "")
    return ErrorResponse.Todo400BadFormData();

  await prisma.todo.create({
    data: {
      uuid: uuidv4(),
      task: task,
    },
  });

  return NextResponse.json({ message: "success" });
}
