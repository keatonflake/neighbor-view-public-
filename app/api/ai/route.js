// Import necessary modules from the Google Generative AI library.
import {
    GoogleGenerativeAI,
    HarmBlockThreshold,
    HarmCategory,
} from "@google/generative-ai";
import { getRecentPosts } from "@/model/post-model";

const API_KEY = process.env.GEMINI_API_KEY || "";

async function aiGeneration(input) {
    try {
        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            safetySettings: [
                {
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });

        const result = await model.generateContent(
            `This is for a neighborhood watch app that takes input from community members. With the following input, make it suitable for all users and summarize these recent reports into about a 100 word summary, return only the summary: "${input}"`
        );
        return result;
    } catch (e) {
        console.error(e);
        throw e;
    }
}

export async function GET() {
    try {
        const posts = await getRecentPosts();
        const flatData = Object.values(posts).map((post) => post.description).join(", ");
        const result = await aiGeneration(flatData);
        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("Error in API:", e);
        return new Response("Error", { status: 500 });
    }
}