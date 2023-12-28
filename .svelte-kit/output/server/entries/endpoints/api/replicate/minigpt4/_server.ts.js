import "replicate";
import { a as getEtsyDescription } from "../../../../../chunks/openAi.js";
import { j as json } from "../../../../../chunks/index.js";
async function getSelectedImageDescription(imageUrl, productDescription, replicate) {
  try {
    console.log("image url", imageUrl);
    const prediction = await replicate.predictions.create(
      {
        version: "b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423",
        input: {
          image: imageUrl,
          prompt: productDescription + " and its style in 500 words",
          num_beams: 5,
          temperature: 1.26,
          top_p: 0.9,
          repetition_penalty: 1,
          max_new_tokens: 3e3,
          max_length: 4e3
        }
      }
    );
    return prediction;
  } catch (error) {
    console.error("Replicate getSelectedImageDescription Error executing script:", error);
    throw error;
  }
}
const POST = async ({ request }) => {
  try {
    const { imageUrl, storeDescription, productDescription } = await request.json();
    console.log("imageUrl", imageUrl);
    const imageDescription = await getSelectedImageDescription(imageUrl, productDescription);
    console.log("imageDescription", imageDescription);
    const etsy = await getEtsyDescription(storeDescription, productDescription, imageDescription);
    console.log("etsy", etsy);
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
