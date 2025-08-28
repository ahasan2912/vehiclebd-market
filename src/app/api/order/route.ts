"use server"
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server"

interface OrderFormType {
    productName: string;
    productPrice: number;
    productImage: string;
    productQuantity: number;
    sellerName: string;
    sellerEmail: string;
    productSize: string;
    buyerName?: string | null;
    buyerEmail?: string | null;
    buyerPhone: string;
    buyerAddress: string;
    orderDate: string;
}

export const POST = async (req: Request) => {
    try {
        const body: OrderFormType = await req.json();
        console.log(body);
        // DB connection
        const order = dbConnect(collectionNameObj.orderCollection);
        const result = await order.insertOne(body);

        return NextResponse.json({
            message: "Vehicle order successfully",
            insertedId: result.insertedId.toString(),
            order: body,
        });

    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const orders = dbConnect(collectionNameObj.orderCollection);
        let query = {};
        if (email) {
            query = { buyerEmail: email }
        }
        //find all vehicles
        const allOrders = await orders.find(query).toArray();
        return NextResponse.json({ orders: allOrders });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}