import { hashPassword } from "@/lib/hashing";
import admin from "firebase-admin";
import serviceAccount from "../neighbor-view-firebase-adminsdk-crijn-30df940946.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://neighbor-view-default-rtdb.firebaseio.com/",
  });
}

const db = admin.database();

export async function getUserByEmail(email) {
  const userSnapshot = await db
    .ref("users")
    .orderByChild("email")
    .equalTo(email.toLowerCase())
    .once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  for (const key in user) {
    return user[key];
  }
}

export async function getUserByKey(uid) {
  const userSnapshot = await db.ref(`users/${uid}`).once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  return user;
}

export async function getUsernameByKey(uid) {
  const userSnapshot = await db.ref(`users/${uid}`).once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  return user.username;
}

export async function getKeyByUsername(username) {
  const userSnapshot = await db
    .ref("users")
    .orderByChild("username")
    .equalTo(username)
    .once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  for (const key in user) {
    return key;
  }
}

export async function getNameByUsername(username) {
  const userSnapshot = await db
    .ref("users")
    .orderByChild("username")
    .equalTo(username)
    .once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  for (const key in user) {
    return user[key].name;
  }
}

export async function getUserRefByUsername(username) {
  const userSnapshot = await db
    .ref("users")
    .orderByChild("username")
    .equalTo(username.toLowerCase())
    .once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  for (const key in user) {
    return userSnapshot.ref.child(key);
  }
}

export async function getUserKeyByEmail(email) {
  const userSnapshot = await db
    .ref("users")
    .orderByChild("email")
    .equalTo(email.toLowerCase())
    .once("value");
  const user = userSnapshot.val();
  if (!user) return null;
  for (const key in user) {
    return key;
  }
}

export async function createUser(email, username, name, password) {
  const hashedPassword = await hashPassword(password);
  const user = {
    email,
    username,
    name,
    password: hashedPassword,
    role: "user",
    joinDate: new Date().toISOString(),
  };
  await db.ref("users").push(user);
}

export async function checkUniqueEmail(email) {
  if (email === "") return false;
  const user = await getUserByEmail(email);
  return !user;
}

export async function createUserIfUnique(email, username, name, password) {
  if (email === "" || username === "" || name === "" || password === "") return;
  if (await checkUniqueEmail(email)) {
    await createUser(email, username, name, password);
  }
}

export async function addUserPost(username, postKey) {
  try {
    const getUser = await getUserRefByUsername(username);
    if (!getUser) return;
    const user = await getUser.once("value");
    const userData = user.val();
    if (!userData) return;
    if (!userData.posts) {
      userData.posts = [postKey];
    } else {
      userData.posts.push(postKey);
    }
    await getUser.update(userData);
    return true;
  } catch (error) {
    console.error("Error adding post to user: ", error);
    return false;
  }
}

export async function removeUserPost(username, postKey) {
  try {
    const getUser = await getUserRefByUsername(username);
    if (!getUser) return;
    const user = await getUser.once("value");
    const userData = user.val();
    if (!userData) return;
    if (!userData.posts) return;
    userData.posts = userData.posts.filter((key) => key !== postKey);
    await getUser.update(userData);
    return true;
  } catch (error) {
    console.error("Error removing post from user: ", error);
    return false;
  }
}
