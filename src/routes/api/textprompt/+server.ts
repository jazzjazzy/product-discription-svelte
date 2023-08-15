import type { RequestHandler } from './$types';
import { Configuration, OpenAIApi } from 'openai';
import {OPENAI_API_KEY} from '$env/static/private';
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ( {request} ) => {

    const { model, systemText, usertext} = await request.json()

    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
            {"role":"system",
            "content":"you are a professional Esty copie writer, writing a 500-word description of an image that is a mockup poster" +
"you are writing a description of a mockup image used to help a seller show how their artwork may look in a room, we are the seller of the mockup, not the artwork." +
"from the description created, generate 13 keywords in a comma-separate list and return the description and keyword in a JSON format in a code block  with the description in a tag called `description` and the keywords in a tag called 'keywords' "},
            {"role":"user",
            "content":"write me a 500 word Etsy description of this mockup image useing this description of the image"+
            `The pink bedroom has a modern and minimalist design. The walls are painted in a light pink colour, and the floor is made of wooden planks. The room has a large window that lets in a lot of natural light, and there is a potted plant sitting on the windowsill. The bed is covered in a light grey comforter and has a pink pillow with a geometric pattern on it. There is a small nightstand next to the bed with a lamp and a book on it. The room has a calm and relaxing atmosphere.`},
        ]
    })

    console.log(chatCompletion.data.choices[0].message);

    return json({
        status: 200,
        output : chatCompletion.data.choices[0].message
    });
};