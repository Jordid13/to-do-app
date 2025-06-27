import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    // Validate here
    if (!id) {
      return NextResponse.json(
        { error: "Request body must contain task id" },
        { status: 400 }
      );
    }

    const todos = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    });
    return NextResponse.json(todos, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}
