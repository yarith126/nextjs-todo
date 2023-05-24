import { NextResponse } from "next/server";

export class ErrorResponse {
  static Todo404NotFound() {
    return NextResponse.json(
      { message: "todo id does not exist" },
      { status: 404 }
    );
  }

  static Todo400ParseFail() {
    return NextResponse.json(
      { message: "failed to parse form data" },
      { status: 400 }
    );
  }

  static Todo400BadRequest() {
    return NextResponse.json(
      {
        message:
          "missing or bad data types of uuid, task, isCompleted, lastUpdatedAt",
      },
      { status: 400 }
    );
  }
}
