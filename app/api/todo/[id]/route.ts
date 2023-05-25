import { ErrorResponse, params } from "@/lib/todo-api-helper";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/**
 * Get a todo by id
 */
export async function GET(req: NextRequest, { params }: params) {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) || -1 },
  });
  if (todo == null) return ErrorResponse.Todo404NotFound();

  return NextResponse.json({ data: todo });
}

/**
 * Update a todo
 *
 * Provide either or both "task" or "isCompleted" in form data to update todo
 */
export async function PUT(req: NextRequest, { params }: params) {
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) || -1 },
  });
  if (todo == null) return ErrorResponse.Todo404NotFound();

  const id = todo.id;
  let task;
  let isCompleted = todo.isCompleted;
  try {
    let formData = await req.formData();
    task = formData.get("task")?.toString() ?? todo.task;
    let status = formData.get("isCompleted") ?? todo.isCompleted.toString();
    isCompleted = status == "true" ? true : false;
  } catch (err) {
    return ErrorResponse.Todo400ParseFail();
  }

  await prisma.todo.update({
    where: { id: id },
    data: {
      task: task,
      isCompleted: isCompleted,
      lastUpdatedAt: new Date().toISOString(),
    },
  });

  return NextResponse.json({ message: "success" });
}

/**
 * Delete a todo
 */
export async function DELETE(req: NextRequest, { params }: params) {
  console.log(params.id);
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(params.id) || -1 },
  });
  if (todo == null) return ErrorResponse.Todo404NotFound();

  await prisma.todo.delete({
    where: { id: todo.id },
  });

  return NextResponse.json({ message: "success" });
}
