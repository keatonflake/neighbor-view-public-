import { getUserByEmail } from "@/model/accounts-model";
import { verifyPassword } from "@/lib/hashing";
import { NextResponse } from "next/server";
import { encrypt } from "./session";
import { cookies } from "next/headers";

export async function login(formData) {
    const formUserData = {
        email: formData.get("email")?.toString() || "",
        username: "",
        password: formData.get("password")?.toString() || "",
        name: formData.get("name")?.toString() || "",
        role: "",
    };

    if (formUserData.password === "")
        return new NextResponse("Missing password", { status: 400 });

    const dbUser = await getUserByEmail(formUserData.email);
    if (!dbUser)
        return new NextResponse("Invalid credentials", { status: 401 });

    if (
        (await verifyPassword(formUserData.password, dbUser.password)) === false
    )
        return new NextResponse("Invalid credentials", { status: 401 });

    formUserData.name = dbUser.name;
    const expires = new Date(Date.now() + 60 * 60 * 1000 * 24);
    const session = await encrypt({
        user: {
            username: dbUser.username,
            name: formUserData.name,
            role: dbUser.role,
        },
        expires,
    });

    cookies().set("session", session, { expires, httpOnly: true });
}

export async function logout() {
    cookies().set("session", "", { expires: new Date(0) });
}
