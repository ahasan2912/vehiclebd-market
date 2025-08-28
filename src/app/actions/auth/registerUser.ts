"use server";
import bcrypt from "bcrypt";
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";

interface RegisterPayload {
    name: string;
    email: string;
    image: string;
    password: string;
}

interface RegisterResponse {
    success: boolean;
    message?: string;
    insertedId?: string;
}

export const registerUser = async (payload: RegisterPayload): Promise<RegisterResponse | null> => {
    const userCollection = dbConnect(collectionNameObj.userCollection);
    //validataion
    const { name, email, image, password } = payload;
    if (!email || !password || !name || !image) return { success: false };

    const user = await userCollection.findOne({ email: payload.email });

    if (!user) {
        const hashPassword = await bcrypt.hash(password, 10);
        payload.password = hashPassword;
        const result = await userCollection.insertOne({ ...payload, role: 'user' });
        return {
            success: true,
            message: "User created",
            insertedId: result.insertedId.toString(),
        };
    }
    return { success: false };
}