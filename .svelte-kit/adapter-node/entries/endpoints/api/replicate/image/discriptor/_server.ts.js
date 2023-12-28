import { g as getSelectedImageDescription } from "../../../../../../chunks/replicate.js";
import { j as json } from "../../../../../../chunks/index.js";
import Replicate from "replicate";
import { R as REPLICATE_API_TOKEN } from "../../../../../../chunks/private.js";
const POST = async ({ request }) => {
  try {
    const { imageUrl, storeDescription, productDescription } = await request.json();
    const replicate = new Replicate({
      // get your token from https://replicate.com/account
      auth: REPLICATE_API_TOKEN
    });
    let imageDescription = "";
    const imagePredition = await getSelectedImageDescription(imageUrl, productDescription, replicate);
    while (true) {
      let prediction = await replicate.predictions.get(imagePredition.id);
      if (prediction.status === "succeeded") {
        const response = await fetch(prediction.urls.get, {
          headers: {
            "Authorization": `Token ${REPLICATE_API_TOKEN}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          imageDescription = data.output;
        }
        ;
        break;
      }
    }
    console.log("imageDescription", imageDescription);
    if (!imageDescription || imageDescription === "" || imageDescription.length < 50) {
      return json({
        status: 409,
        body: {
          message: "Error executing script no discription returned or image type is not valid."
        }
      });
    }
    return json({
      status: 200,
      body: imageDescription
    });
  } catch (error) {
    console.error("Error executing script:", error);
    return json({
      status: 500,
      body: {
        message: "Error executing script while getting image discription."
      }
    });
  }
};
export {
  POST
};
