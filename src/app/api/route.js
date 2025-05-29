import { NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI()

export async function GET(request) {

    const { searchParams } = new URL(request.url)
    const data = searchParams.get("data")
    // const safeData = 
    const sysPrompt = `You are a professional book reviewer specializing in writing thoughtful and concise reviews based on feedback from readers. A reader has provided 1-2 lines about what they liked about a book. Your task is to write a concise and complete review based strictly on this input, without adding unrelated details.

    The review should cover three key points:
    1. What you personally liked about the book, based on the reader’s input.
    2. What stood out or helped you the most in the book, as per the reader’s feedback.
    3. Why you would recommend the book to others.

    Make the review clear, engaging, and easy to understand. Here’s the reader’s feedback: "${data}"`;

    const response = await client.chat.completions.create({
        model : "chatgpt-4o-latest",
        messages : [
            {"role" : "system", "content" : sysPrompt},
            {"role" : "user", "content" : "Generate Review"} 
        ]
    })

    const genReview = response.choices[0].message.content

    console.log(response.choices[0].content)

    const res = NextResponse.json({"review" : genReview })
    
    // Set CORS headers on the NextResponse object
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.headers.set("Access-Control-Allow-Headers", "Content-Type");
    
    return res;

}