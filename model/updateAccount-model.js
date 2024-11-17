import admin from "firebase-admin";
import serviceAccount from "../neighbor-view-firebase-adminsdk-crijn-30df940946.json";
import { getKeyByUsername, getUserByKey } from "./accounts-model";
import { verifyPassword, hashPassword } from "@/lib/hashing";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://neighbor-view-default-rtdb.firebaseio.com/",
  });
}

const db = admin.database();
const usersRef = db.ref("users");

export async function changeUsername(oldUsername, newUsername) {
  const userKey = await getKeyByUsername(oldUsername);
  if (!userKey) return false;
  await usersRef.child(userKey).update({ username: newUsername });
  return true;
}

export async function changeEmail(username, newEmail) {
  const userKey = await getKeyByUsername(username);
  if (!userKey) return false;
  await usersRef.child(userKey).update({ email: newEmail });
  return true;
}

export async function changeName(username, newName) {
  const userKey = await getKeyByUsername(username);
  if (!userKey) return false;
  await usersRef.child(userKey).update({ name: newName });
  return true;
}

export async function changePassword(username, oldPassword, newPassword) {
  const userKey = await getKeyByUsername(username);
  if (!userKey) return false;
  const user = await getUserByKey(userKey);
  if (await verifyPassword(oldPassword, user.password)) {
    const newHashedPassword = await hashPassword(newPassword);
    await usersRef.child(userKey).update({ password: newHashedPassword });
    return true;
  } else {
    return false;
  }
}
