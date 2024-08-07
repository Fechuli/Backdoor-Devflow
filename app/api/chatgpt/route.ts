import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { question } = await request.json();

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: "You are a professional coding expert and an experienced instructor. Your goal is to provide clear, accurate, and detailed explanations to help users understand complex coding concepts and solve programming problems effectively."
                    },
                    {
                        role: 'user',
                        content: `Tell me ${question}`,
                    },
                ],
            }),
        })  

        const responseData = await response.json();
        const reply = responseData.choices[0].message.content;

        return NextResponse.json({ reply });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}