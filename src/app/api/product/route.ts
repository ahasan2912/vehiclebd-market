"use server"
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server"

interface Vehicle {
    name: string;
    material: string;
    price: number;
    discount: number;
    year: number;
    size: string;
    image: string;
    email?: string | null;
    sellername?: string | null;
}

export const POST = async (req: Request) => {
    try {
        const body: Vehicle = await req.json();
        // DB connection
        const products = dbConnect(collectionNameObj.productCollection);
        const result = await products.insertOne(body);

        return NextResponse.json({
            message: "Vehicle added successfully",
            insertedId: result.insertedId.toString(),
            vehicle: body,
        });

    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

export const GET = async (req: Request) => {
    try {
        const products = dbConnect(collectionNameObj.productCollection);

        //find all vehicles
        const allVehicles = await products.find({}).toArray();
        return NextResponse.json({ vehicles: allVehicles });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

