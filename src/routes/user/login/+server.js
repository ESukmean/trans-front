// import type { RequestHandler } from "@sveltejs/kit";

export async function POST(event) {
    console.log(event);

    return new Response("test")
}