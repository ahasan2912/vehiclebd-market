import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url);
        const email = searchParams.get("email");
        const userCollection = dbConnect(collectionNameObj.userCollection);
        //findoene user
        const userRole = await userCollection.findOne({ email: email });
        return NextResponse.json({ role: userRole });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Something went wrong";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}