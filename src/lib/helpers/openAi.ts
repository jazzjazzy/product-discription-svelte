import { OPENAI_API_KEY } from '$env/static/private';
import { Configuration, OpenAIApi } from 'openai';

export async function getEtsyDescription(storeDiscription: string, productDescription:string, imageDes: string): Promise<any> {

    try {
        const configuration = new Configuration({
            apiKey: OPENAI_API_KEY,
        });

        const openai = new OpenAIApi(configuration);

        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                {
                    "role": "system",
                    "content": "you are a professional Esty copie writer, writing a 500-word description of an image of a product discribed" +
                        " there store is discribed as " +
                        storeDiscription +
                        " you are writing a description of the discribed product used to help a seller." +
                        " from the description created write a title for etsy of 140 charaters" +
                        " but the first 50 should be about product, images, photography and design as well generate 13 keywords in a " +
                        " comma-separate list and return the description and keyword in a JSON format in a code block with the title in a tag " +
                        " called `title`, the description in a tag called `description` and the keywords in a tag called 'keywords'"
                },
                {
                    "role": "user",
                    "content": "write me a 500 word Etsy description using this description of the image" +
                        imageDes +
                        " and this description of the product" +
                        productDescription
                },
            ]
        })

        console.log('chatCompletion', chatCompletion.data.choices[0].message?.content);

        return chatCompletion.data.choices[0].message?.content
    } catch (error) {
        console.error('OpenAi getEtsyDescription : Error executing script:', error);
        throw error;
    }
}