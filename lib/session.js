import { SignJWT, jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = process.env.SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(payload.expires)
        .sign(key);
}

async function decrypt(input) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        if (error instanceof JWTExpired) {
            console.error("Token has expired");
            return null;
        } else {
            console.error("Token verification failed: ", error);
            return null;
        }
    }
}

async function getSession() {
    const session = cookies().get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

async function updateSession(request) {
    const session = request.cookies.get("session")?.value;
    if (!session) return;

    const parsed = await decrypt(session);
    if (!parsed) return;

    parsed.expires = new Date(Date.now() + 60 * 60 * 1000 * 24);

    const updatedSessionData = {
        user: {
            username: parsed.user.username,
            name: parsed.user.name,
            role: parsed.user.role,
        },
        expires: parsed.expires,
    };

    const res = NextResponse.next();
    res.cookies.set({
        name: "session",
        value: await encrypt(updatedSessionData),
        httpOnly: true,
        expires: parsed.expires,
    });
    return res;
}

export { encrypt, decrypt, getSession, updateSession };
