import type { Actions } from './$types';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { Storage } from '@google-cloud/storage';
import { BUCKET_KEY_FILE, BUCKET_NAME, BUCKET_URL, } from '$env/static/private';




const keyObject = JSON.parse(BUCKET_KEY_FILE);

const storage = new Storage({ credentials: keyObject });
const bucket = storage.bucket(BUCKET_NAME);

export const actions: Actions = {
  upload: async ({ cookies, request, locals }) => {
    try {
      const data = await request.formData();
      const file = data.get('file') as File;



      if (!file) {
        return { success: false, message: 'File type not accepted.' };
      }

      const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'];

      if (!acceptedFileTypes.includes(file.type)) {
        return { success: false, message: 'File type not accepted.' };
      }

      let bufferToUpload: Uint8Array;

      if (['image/png', 'image/webp', 'image/avif'].includes(file.type)) {
        // Convert the file's stream to a buffer.
        const fileBuffer = new Uint8Array(await file.arrayBuffer());

        // Process the buffer with sharp.
        bufferToUpload = await sharp(fileBuffer)
          .toFormat('jpeg')
          .toBuffer();
      } else {
        bufferToUpload = new Uint8Array(await file.arrayBuffer());
      }

      const gcsFileName = `${Date.now()}-${file.name}.jpg`;
      const gcsFile = bucket.file(gcsFileName);

      const google = await new Promise((resolve, reject) => {
        const stream = gcsFile.createWriteStream({ contentType: 'image/jpeg' });
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(bufferToUpload);
      });

      // If you need the public URL, you can generate it. This assumes your bucket is public.
      const publicUrl = `${BUCKET_URL}/${bucket.name}/${gcsFileName}`;

      return { success: true, message: publicUrl };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
};
