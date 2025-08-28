import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const userCollection = dbConnect(collectionNameObj.userCollection);
        const users = await userCollection.find({}).toArray();
        return NextResponse.json({ users: users });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}