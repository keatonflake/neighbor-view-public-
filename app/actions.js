"use server";
import { getAllPins } from "@/model/post-model";

export async function getPins() {
    return await getAllPins();
}