import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await context.params;

    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid ID", deletedCount: 0 },
        { status: 400 }
      );
    }
    const db = dbConnect(collectionNameObj.userCollection);
    const result = await db.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "User not found", deletedCount: 0 },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: `User ${id} deleted`, deletedCount: result.deletedCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete user", deletedCount: 0 },
      { status: 500 }
    );
  }
};