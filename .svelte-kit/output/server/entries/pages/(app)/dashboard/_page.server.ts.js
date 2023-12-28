import "../../../../chunks/index.js";
import { writeFile } from "fs/promises";
import fs from "fs";
import path from "path";
import sharp from "sharp";
const load = async ({ locals }) => {
  let session = await locals.auth.validate();
  return {
    session: session.sessionId
  };
};
const actions = {
  upload: async ({ request }) => {
    const data = await request.formData();
    const file = data.get("file");
    if (!file) {
      return { success: false, message: "File type not accepted." };
    }
    const directoryPath = "./static/uploads";
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    const filePath = path.join(directoryPath, file.name);
    const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"];
    if (!acceptedFileTypes.includes(file.type)) {
      return { success: false, message: "File type not accepted." };
    }
    await writeFile(filePath, file.stream());
    if (["image/png", "image/webp", "image/avif"].includes(file.type)) {
      let fileType = "." + file.type.split("/").pop();
      let inputtfile = `./static/uploads/${file.name}`;
      let outputPath = inputtfile.replace(fileType, ".jpg");
      let filename2 = outputPath.split("/").pop();
      await sharp(inputtfile).toFormat("jpeg").toFile(outputPath, (err, info) => {
        if (err) {
          return { status: false, body: { message: "Error:", err } };
        } else {
          return { status: true, body: { message: "File converted successfully:", info } };
        }
      });
      return { status: true, message: filename2 };
    }
    let filename = filePath.split("/").pop();
    return { success: true, message: filename };
  }
};
export {
  actions,
  load
};
