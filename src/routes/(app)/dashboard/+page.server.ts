import type { Actions } from './$types';
import { Storage } from '@google-cloud/storage';
import { BUCKET_KEY_FILE, BUCKET_NAME, BUCKET_URL, } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';


export const load = (async ({ locals }) => {
  let session = await locals.auth.validate(); // get the session from the auth request
  if (!session) {
    throw redirect(302, '/login');
  }

  return {};
}) satisfies PageServerLoad;

const keyObject = JSON.parse(BUCKET_KEY_FILE);

const storage = new Storage({ credentials: keyObject });
const bucket = storage.bucket(BUCKET_NAME);

export const actions: Actions = {
  upload: async ({ cookies, request, locals }) => {
  
    const data = await request.formData();
    const file = data.get('file') as File; // value of 'name' attribute of input

    if (!file) {
      return { success: false, message: 'File type not accepted.' };
    }

    const directoryPath = './static/uploads';

    //create directory if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const filePath = path.join(directoryPath, file.name);

    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'];

    if (!acceptedFileTypes.includes(file.type)) {
      return { success: false, message: 'File type not accepted.' };
    }

    await writeFile(filePath, file.stream());

    //if file is not an jpg then we convert it to jpg
    if (['image/png', 'image/webp', 'image/avif'].includes(file.type)) {
      // get the file type from the Mime type
      let fileType = '.' + (file.type).split('/').pop();
      //get the input file path
      let inputtfile = `./static/uploads/${file.name}`;
      //get the output file path
      let outputPath = inputtfile.replace(fileType, '.jpg')

      let filename = (outputPath).split('/').pop();

      const convertedBuffer = await sharp(inputtfile)
        .toFormat('jpeg')
        .toFile(outputPath, (err, info) => {
          if (err) {
            return { status: false, body: { message: 'Error:', err: err } }
          } else {
            return { status: true, body: { message: 'File converted successfully:', info: info } }
          }
        });

      return { status: true, message: filename };
    }

    let filename = (filePath).split('/').pop();

    return { success: true, message: filename };
  }
}
