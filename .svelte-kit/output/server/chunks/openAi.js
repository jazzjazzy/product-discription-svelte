import { O as OPENAI_API_KEY } from "./private.js";
import OpenAI from "openai";
import fs from "fs";
import path from "path";
function encodeImageToBase64(image) {
  const imagePath = path.resolve(`static/uploads/${image}`);
  const imageBuffer = fs.readFileSync(imagePath);
  return imageBuffer.toString("base64");
}
async function getEtsyDescription(chat, countRetrys = 0) {
  try {
    const maxCountRetrys = 3;
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
    const chatCompletion = await openai.chat.completions.create({
      "model": "gpt-4-1106-preview",
      "temperature": chat.temperature,
      "messages": [
        {
          "role": "system",
          "content": `you are a professional Esty copie writer, writing a summarie description of a product, the customer discribed their store as ${chat.storeDescription}  you are writing a description of the discribed product used to help a seller. from the description created write a title for etsy of 140 charaters but the first 50 should be about product, images, photography and design as well generate 13 keywords in a comma-separate list and return the description and keyword in a JSON format in a code block with the title in a tag called 'title', the description in a tag called 'description' and the keywords in a tag called 'keywords'`
        },
        {
          "role": "user",
          "content": `write me a whole new product description using this description of the image  ${chat.imageDescription} and this description of the product ${chat.productDescription}, do not copy the contents of the image description or the product description,make the discription at least ${chat.charatorCount} charactors long, make it simple and easy to understand, do not try to over sell it`
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
      "max_tokens": chat.charatorCount
    });
    const chatCompletionJson = JSON.parse(chatCompletion.choices[0].message?.function_call?.arguments).results[0];
    const currDesciption = chatCompletionJson;
    if (!currDesciption || !currDesciption.product_title || !currDesciption.product_description || !currDesciption.product_keywords) {
      if (countRetrys >= maxCountRetrys) {
        throw new Error("Too many retrys, attempt canceled");
      }
      return getEtsyDescription(chat, countRetrys + 1);
    }
    return chatCompletionJson;
  } catch (error) {
    return error;
  }
}
async function getImageDescription(productDescription, imageDes) {
  try {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
      // Replace with your actual API key
    });
    let imageBase64 = encodeImageToBase64(imageDes);
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
    return chatCompletion.choices[0].message?.content;
  } catch (error) {
    console.error(error);
    return { success: false, message: error.message };
  }
}
export {
  getEtsyDescription as a,
  getImageDescription as g
};
