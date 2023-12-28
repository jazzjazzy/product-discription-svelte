// @ts-nocheck
import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * varaibles
 */


/***
 * LOAD
 */

export const load = (async ({ locals }) => {
  let session = await locals.auth.validate(); // get the session from the auth request

  // we need the session id to send as part of api/discriptor request so we can get the user id on the sever side
  return {
    session: session.sessionId
  };
}) satisfies PageServerLoad;



/***
 * ACTIONS
 */

export const actions = {
  upload: async ({ request }: import('./$types').RequestEvent) => {
  
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

      //convert file to jpg
      await sharp(inputtfile)
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
;null as any as Actions;