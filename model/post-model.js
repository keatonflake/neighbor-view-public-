import admin from "firebase-admin";
import serviceAccount from "../neighbor-view-firebase-adminsdk-crijn-30df940946.json";
import { getKeyByUsername } from "./accounts-model";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://neighbor-view-default-rtdb.firebaseio.com/",
  });
}

const db = admin.database();

export async function postCount() {
  const snapshot = await db.ref("posts").get();
  return snapshot.numChildren();
}

export async function createDbPost(post, username) {
  // Pushing the post to the database
  const postRef = db.ref("posts").push();
  await postRef.set(post);
  // Adding the post to the user's post list
  const userKey = await getKeyByUsername(username);
  const userPostRef = db.ref(`users/${userKey}/posts`);
  await userPostRef.push(postRef.key);
  // Returning the post key
  return postRef.key;
}

export async function getAllPosts() {
  const snapshot = await db.ref("posts").get();
  return snapshot.val();
}

export async function getRecentPosts() {
  const snapshot = await db.ref("posts").limitToLast(5).get();
  return snapshot.val();
}

export async function getAllPins() {
  let returnData = [];
  const snapshot = await db.ref("posts").get();
  const data = snapshot.val();
  const random = Math.random() * 0.008 + 0.001;
  Object.keys(data).forEach((key) => {
    returnData.push({
      name: `Report: ${data[key].type}`,
      category: data[key].type,
      description: data[key].description,
      position: {
        lat: parseFloat(data[key].location.lat) + random,
        lng: parseFloat(data[key].location.lng) - random,
      },
    });
  });
  return returnData;
}
