import { g as getImageDescription, a as getEtsyDescription } from "../../../../chunks/openAi.js";
import { j as json } from "../../../../chunks/index.js";
import { p as prisma } from "../../../../chunks/prisma.js";
const POST = async ({ request }) => {
  try {
    const { imageUrl, storeDescription, productDescription, temperature, charatorCount, storeType, token } = await request.json();
    const user = await prisma.session.findUnique({
      where: { id: token },
      select: { user_id: true }
    });
    const imageDescription = await getImageDescription(productDescription, imageUrl);
    if (!imageDescription || imageDescription === "" || imageDescription.length < 50) {
      return json({
        status: 409,
        body: {
          message: "Error executing script no discription returned or image type is not valid."
        }
      });
    }
    let chatProductSetting = {
      storeDescription,
      productDescription,
      imageDescription,
      temperature,
      charatorCount
    };
    const etsyDescription = await getEtsyDescription(chatProductSetting);
    if (!etsyDescription || etsyDescription === "" || etsyDescription < 50) {
      console.log("Error executing script no discription returned or image type is not valid.");
      return json({
        status: 409,
        body: {
          message: "Error executing script no discription returned or image type is not valid."
        }
      });
    }
    if (etsyDescription) {
      const { product_title, product_description, product_keywords } = etsyDescription;
      let imagetype = "base64";
      if (imageUrl.startsWith("https://") || imageUrl.startsWith("http://")) {
        imagetype = "url";
      }
      let pageDescriptionCount = product_description.length;
      let pageTitleCount = product_title.length;
      let pageTitle = product_title;
      let pageDescription = product_description;
      let pageKeywords = product_keywords;
      try {
        const newHistory = await prisma.descriptionHistory.create({
          data: {
            user_id: user?.user_id,
            store_type: "etsy",
            image_location: imageUrl,
            image_type: imagetype,
            image_description: imageDescription,
            shop_description: storeDescription,
            product_description: productDescription,
            temperature,
            charactor_size: charatorCount,
            generated_title: pageTitle,
            generated_description: pageDescription,
            generated_keywords: pageKeywords,
            generated_json: etsyDescription,
            count_title: pageTitleCount,
            count_description: pageDescriptionCount
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No results found or results array is empty");
    }
    return json({
      status: 200,
      body: etsyDescription
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
