import { p as prisma } from "../../../../../chunks/prisma.js";
import { j as json } from "../../../../../chunks/index.js";
const POST = async () => {
  const user = await prisma.descriptionHistory.findMany({ orderBy: { created_at: "desc" } });
  const maxLength = 50;
  user.forEach((item) => {
    if (item.image_description && item.image_description.length > maxLength) {
      item.image_description = item.image_description.substring(0, maxLength) + "...";
    }
    if (item.shop_description && item.shop_description.length > maxLength) {
      item.shop_description = item.shop_description.substring(0, maxLength) + "...";
    }
    if (item.product_description && item.product_description.length > maxLength) {
      item.product_description = item.product_description.substring(0, maxLength) + "...";
    }
    if (item.generated_title && item.generated_title.length > maxLength) {
      item.generated_title = item.generated_title.substring(0, maxLength) + "...";
    }
    if (item.generated_description && item.generated_description.length > maxLength) {
      item.generated_description = item.generated_description.substring(0, maxLength) + "...";
    }
    if (item.generated_keywords && item.generated_keywords.length > maxLength) {
      item.generated_keywords = item.generated_keywords.substring(0, maxLength) + "...";
    }
  });
  return json({
    status: 200,
    body: {
      message: user.length,
      user
    }
  });
};
export {
  POST
};
