import { g as getSelectedImageDescription } from "../../../../../chunks/replicate.js";
import { O as OPENAI_API_KEY } from "../../../../../chunks/private.js";
import OpenAI from "openai";
import { j as json } from "../../../../../chunks/index.js";
async function getEtsyDescription(storeDiscription, productDescription, imageDes) {
  try {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          "role": "system",
          "content": "you are a professional Esty copie writer, writing a 500-word description of an image of a product discribed there store is discribed as " + storeDiscription + " you are writing a description of the discribed product used to help a seller. from the description created write a title for etsy of 140 charaters but the first 50 should be about product, images, photography and design as well generate 13 keywords in a  comma-separate list and return the description and keyword in a JSON format in a code block with the title in a tag  called `title`, the description in a tag called `description` and the keywords in a tag called 'keywords'"
        },
        {
          "role": "user",
          "content": "write me a 500 word Etsy description using this description of the image" + imageDes + " and this description of the product" + productDescription
        }
      ]
    });
    console.log("chatCompletion", chatCompletion.data.choices[0].message?.content);
    return chatCompletion.data.choices[0].message?.content;
  } catch (error) {
    console.error("OpenAi getEtsyDescription : Error executing script:", error);
    throw error;
  }
}
const POST = async ({ request }) => {
  try {
    const { imageUrl, storeDescription, productDescription } = await request.json();
    console.log("imageUrl", imageUrl);
    const imageDescription = await getSelectedImageDescription(imageUrl, productDescription);
    const etsy = await getEtsyDescription(storeDescription, productDescription, imageDescription);
    let etsyDescription = cleanEstyDescription(etsy);
    if (!etsyDescription) {
      return json({
        status: 409,
        body: {
          message: "Error executing script no discription returned."
        }
      });
    }
    let body = JSON.parse(etsyDescription);
    let { title, description, keywords } = body;
    if (!title || !description || !keywords) {
      return json({
        status: 409,
        body: {
          message: "Error executing script no discription returned."
        }
      });
    }
    let descriptionJason = {
      title,
      description,
      keywords
    };
    console.log("description", description);
    console.log("keywords", keywords);
    return json({
      status: 200,
      body: descriptionJason
    });
  } catch (error) {
    console.error("Error executing script:", error);
    return json({
      status: 500,
      body: {
        message: "Error executing script."
      }
    });
  }
};
function cleanEstyDescription(dirtyString) {
  if (!dirtyString)
    return;
  try {
    let str = dirtyString;
    let regEx = /"([\s\S]*?)"\s*:\s*"([\s\S]*?)"/g;
    let match;
    let desresult = {};
    while ((match = regEx.exec(str)) != null) {
      let regexCR = /(\r\n|\n|\r)/gm;
      let dirtyClear = match[2].replace(regexCR, "</br>");
      desresult[match[1]] = dirtyClear;
    }
    console.log("desresult", JSON.stringify(desresult));
    return JSON.stringify(desresult);
  } catch (error) {
    console.error("cleanEstyDescription Error executing script:", error);
    throw error;
  }
}
export {
  POST
};
