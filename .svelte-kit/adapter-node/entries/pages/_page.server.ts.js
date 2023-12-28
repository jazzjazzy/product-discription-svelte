import sharp from "sharp";
import { Storage } from "@google-cloud/storage";
import { B as BUCKET_KEY_FILE, a as BUCKET_NAME, b as BUCKET_URL } from "../../chunks/private.js";
const csr = false;
const keyObject = JSON.parse(BUCKET_KEY_FILE);
const storage = new Storage({ credentials: keyObject });
const bucket = storage.bucket(BUCKET_NAME);
const actions = {
  upload: async ({ cookies, request, locals }) => {
    try {
      const data = await request.formData();
      const file = data.get("file");
      if (!file) {
        return { success: false, message: "File type not accepted." };
      }
      const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/avif"];
      if (!acceptedFileTypes.includes(file.type)) {
        return { success: false, message: "File type not accepted." };
      }
      let bufferToUpload;
      if (["image/png", "image/webp", "image/avif"].includes(file.type)) {
        const fileBuffer = new Uint8Array(await file.arrayBuffer());
        bufferToUpload = await sharp(fileBuffer).toFormat("jpeg").toBuffer();
      } else {
        bufferToUpload = new Uint8Array(await file.arrayBuffer());
      }
      const gcsFileName = `${Date.now()}-${file.name}.jpg`;
      const gcsFile = bucket.file(gcsFileName);
      const google = await new Promise((resolve, reject) => {
        const stream = gcsFile.createWriteStream({ contentType: "image/jpeg" });
        stream.on("error", reject);
        stream.on("finish", resolve);
        stream.end(bufferToUpload);
      });
      const publicUrl = `${BUCKET_URL}/${bucket.name}/${gcsFileName}`;
      return { success: true, message: publicUrl };
    } catch (error) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
};
export {
  actions,
  csr
};
