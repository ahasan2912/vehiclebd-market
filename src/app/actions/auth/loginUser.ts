"use server"
import { collectionNameObj, dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcrypt";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    image: string,
    role?: "admin" | "user";
}

export const loginUser = async (payload: LoginPayload): Promise<User | null> => {
    const { email, password } = payload;
    const userCollection = dbConnect(collectionNameObj.userCollection);
    const user = await userCollection.findOne({ email });
    if (!user) return null;

    const isPasswordOK = await bcrypt.compare(password, user.password);
    if (!isPasswordOK) return null;

    // Convert to your defined User type
    const safeUser: User = {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        role: user.role,
    };

    return safeUser;
}