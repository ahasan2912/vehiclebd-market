import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    // Validate the id
    if (!id || !ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }
    // Connect to MongoDB
    const productCollection = dbConnect(collectionNameObj.productCollection);
    const data = await productCollection.findOne({ _id: new ObjectId(id) });

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

export const DELETE = async (
  req: Request,
  context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const query = { _id: new ObjectId(id) }

    const productCollection = dbConnect(collectionNameObj.productCollection);
    const deleteResponse = await productCollection.deleteOne(query);
    if (deleteResponse.deletedCount > 0) {
      return NextResponse.json({
        message: "Product deleted successfully",
        deletedCount: deleteResponse.deletedCount
      });
    } else {
      return NextResponse.json({
        message: "No Product found to delete",
        deletedCount: deleteResponse.deletedCount
      }, { status: 404 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export const PATCH = async (
  req: Request,
  context: { params: Promise<{ id: string }> }) => {
  try {
    const { id } = await context.params;
    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Request body is empty" }, { status: 400 });
    }
    //edited
    const { name, material, price, discount, year, size, image } = body || {};
    
    const productCollection = await dbConnect(collectionNameObj.productCollection);
    const query = { _id: new ObjectId(id) };
    //edited
    const updateDoc = {
      $set: { name, material, price, discount, year, size, image },
    }

    const updateResult = await productCollection.updateOne(query, updateDoc);
    if (updateResult.modifiedCount > 0) {
      return NextResponse.json({
        message: "Product updated successfully",
        modifiedCount: updateResult.modifiedCount
      });
    } else {
      return NextResponse.json({
        message: "No changes made to the Product",
        modifiedCount: updateResult.modifiedCount
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
