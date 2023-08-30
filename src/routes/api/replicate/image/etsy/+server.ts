import { createParser } from 'eventsource-parser';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import type { CreateChatCompletionRequestMessage } from 'openai/resources/chat';

const key = OPENAI_API_KEY;



export type OpenAIStreamPayload = {
    model: string;
    messages: {
        role: string;
        content: string;
    }[]
    stream: boolean;
}

async function OpenAIStreamer(payload: OpenAIStreamPayload) {
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    let counter = 0;

    const openai = new OpenAI({
        apiKey: key,
    });

    const res = await openai.chat.completions.create(payload);

    const stream = new ReadableStream({
        async start(controller) {
            function onParse(event: any) {
                if (event.type === 'event') {
                    const data = event.data;
                    // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
                    if (data === '[DONE]') {
                        controller.close();
                        return;
                    }
                    try {
                        const json = JSON.parse(data);
                        const text = json.choices[0].text;
                        console.log(text);

                        if (counter < 2 && (text.match(/\n/) || []).length) {
                            // this is a prefix character (i.e., "\n\n"), do nothing
                            return;
                        }
                        const queue = encoder.encode(text);
                        controller.enqueue(queue);
                        counter++;
                    } catch (e) {
                        controller.error(e);
                    }
                }
            }

            // stream response (SSE) from OpenAI may be fragmented into multiple chunks
            // this ensures we properly read chunks and invoke an event for each SSE event stream
            const parser = createParser(onParse);
            // https://web.dev/streams/#asynchronous-iteration
            for await (const chunk of res.body as any) {
                parser.feed(decoder.decode(chunk));
            }
        }
    });
    return stream;
}

export async function POST({ request }: { request: any }) {

    const { imageDescription, productDescription, storeDescription } = await request.json();

    let messages = [
        {
            "role": "system",
            "content": "you are a professional Esty copie writer, writing a 500-word description of an image of a product discribed" +
                " there store is discribed as " +
                storeDescription +
                " you are writing a description of the discribed product used to help a seller." +
                " from the description created write a title for etsy of 140 charaters" +
                " but the first 50 should be about product, images, photography and design as well generate 13 keywords in a " +
                //" comma-separate list and return title, discription and keywords delimiated by this ++++"

                " comma-separate list and return the a title, a description and keyword \n\n" + // in a JSON format with the title in a tag" +
                //" called `title`, the description in a tag called `description` and the keywords in a tag called 'keywords' and make no other" +
                //" comment or referals to the content" 

                "Title:" +
                "Description:" +
                "Keywords:"

        },
        {
            "role": "user",
            "content": "write me a 500 word Etsy description using this description of the image" +
                imageDescription +
                " and this description of the product" +
                productDescription
        },
    ] as CreateChatCompletionRequestMessage[];

    const openai = new OpenAI({
        apiKey: key,
    });

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: true,
        messages: messages,
    })
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response)
    // Respond with the stream
    return new StreamingTextResponse(stream)
}

