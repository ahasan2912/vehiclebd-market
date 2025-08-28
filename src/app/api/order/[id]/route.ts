"use server"
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
    const singleOrder = dbConnect(collectionNameObj.orderCollection);
    const data = await singleOrder.findOne({ _id: new ObjectId(id) });

    if (!data) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(data);

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
};

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

    const { productQuantity, productSize, buyerAddress, buyerPhone } = body || {};
    const orderCollection = await dbConnect(collectionNameObj.orderCollection);

    const query = { _id: new ObjectId(id) };
    const updateDoc = {
      $set: { productQuantity, productSize, buyerAddress, buyerPhone },
    }

    const updateResult = await orderCollection.updateOne(query, updateDoc);
    if (updateResult.modifiedCount > 0) {
      return NextResponse.json({
        message: "Order updated successfully",
        modifiedCount: updateResult.modifiedCount
      });
    } else {
      return NextResponse.json({
        message: "No changes made to the order",
        modifiedCount: updateResult.modifiedCount
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

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

    const orderCollection = dbConnect(collectionNameObj.orderCollection);
    const deleteResponse = await orderCollection.deleteOne(query);
    if (deleteResponse.deletedCount > 0) {
      return NextResponse.json({
        message: "Order deleted successfully",
        deletedCount: deleteResponse.deletedCount
      });
    } else {
      return NextResponse.json({
        message: "No order found to delete",
        deletedCount: deleteResponse.deletedCount
      }, { status: 404 });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
