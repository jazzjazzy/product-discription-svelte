import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { page } from '$app/stores'

export function encodeImageToBase64(image: String) {
    // Assuming your SvelteKit project root is the current working directory
    const imagePath = path.resolve(`static/uploads/${image}`); // Replace with your image file path
    const imageBuffer = fs.readFileSync(imagePath);
    return imageBuffer.toString('base64');
}
//TODO this is not being used WHY!!
export async function getEtsyDescription(storeDiscription: string, productDescription: string, imageDes: string): Promise<any> {

    try {
        // console.log('storeDiscription', storeDiscription);
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY,
        });

        const chatCompletion = await openai.chat.completions.create({
            "model": "gpt-4-1106-preview",
            "temperature": 0.1,
            "messages": [
                {
                    "role": "system",
                    "content": "you are a professional Esty copie writer, writing a summarie description of a product, " +
                        `the customer discribed their store as ${storeDiscription}  you are writing a description of the discribed ` +
                        "product used to help a seller. from the description created write a title for etsy of 140 charaters but the " +
                        "first 50 should be about product, images, photography and design as well generate 13 keywords in a comma-separate " +
                        "list and return the description and keyword in a JSON format in a code block with the title in a tag called 'title', " +
                        "the description in a tag called 'description' and the keywords in a tag called 'keywords'"
                },
                {
                    "role": "user",
                    "content": "write me a whole new short product description using this description of the image " +
                        ` ${imageDes} and this description of the product ${productDescription}, do not copy the contents of the image description or the product description,`
                }
            ],
            "functions": [{
                "name": "generate_product",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "results": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "product_title": {
                                        "type": "string"
                                    },
                                    "product_description": {
                                        "type": "string"
                                    },
                                    "product_keywords": {
                                        "type": "string"
                                    }
                                },
                                "required": ["title", "description", "keywords"],
                                "additionalProperties": false
                            }
                        }
                    },
                    "required": ["title", "description", "keywords"]
                }
            }],
            "max_tokens": 2000
        })

        console.log('chatCompletion', chatCompletion.choices[0].message?.function_call?.arguments);

        return chatCompletion.choices[0].message?.function_call?.arguments
    } catch (error) {
        console.error('OpenAi getEtsyDescription : Error executing script:', error);
        throw error;
    }
}


export async function getImageDescription(productDescription: string, imageDes: string): Promise<any> {
    try {
        //const data = await request.formData();
        // const imageFile = data.get('file') as File;
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY, // Replace with your actual API key
        });

        let imageBase64 = encodeImageToBase64(imageDes);

        // Upload the image
        const chatCompletion = await openai.chat.completions.create({
            "model": "gpt-4-vision-preview",
            "messages": [
                {
                    "role": "system",
                    "content": "you are a professional Esty copie writer, writing a 1000 charactors description of an image of a product discribed,make it simple and easy to understand, do not try to over sell it"
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": productDescription
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": `data:image/jpeg;base64,${imageBase64}`
                            }
                        }
                    ]
                }
            ],
            "max_tokens": 300
        });


        //console.log('chatCompletionDescription', chatCompletion.choices[0].message?.content);

        return chatCompletion.choices[0].message?.content

    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message };
    }
}
