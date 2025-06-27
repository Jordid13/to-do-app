import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { todo } from "node:test";
import { error } from "console";
import { deepStrictEqual } from "assert";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, dueDate, status } = await request.json();

    // Validate here
    if (!name || !status) {
      return NextResponse.json({ error: "Bad request body" }, { status: 400 });
    }

    const todos = await prisma.todo.create({
      data: {
        name,
        dueDate,
        status,
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

export async function PATCH(request: NextRequest) {
  try {
    const { id, name, dueDate, status } = await request.json();

    // If user does not send an id this function is useless
    if (!id) {
      return NextResponse.json(
        { error: "Request body must contain task id" },
        { status: 400 }
      );
    }

    // If user does not send any data to update notify client of error
    if (!name && !status && !dueDate) {
      return NextResponse.json(
        { error: "Request body must have data to update" },
        { status: 400 }
      );
    }

    const todos = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        name,
        dueDate,
        status,
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
