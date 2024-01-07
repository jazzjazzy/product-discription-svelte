import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import sharp from 'sharp';
import { redirect } from '@sveltejs/kit';
import { isPlanLimitReached } from '$lib/helpers/user';
import { Storage } from '@google-cloud/storage';
import { BUCKET_KEY_FILE, BUCKET_URL, BUCKET_NAME } from '$env/static/private';
import { Buffer } from 'buffer';

/**
 * varaibles
 */


/***
 * LOAD
 */

export const load = (async ({ locals }) => {
  let session = await locals.auth.validate(); // get the session from the auth request

  if (!session) throw redirect(302, "/login");
  if (!session.user.emailVerified) {
    throw redirect(302, "/email-verification");
  }

  let monthlyLimit = isPlanLimitReached(session.user.userId, session.plan)
  // we need the session id to send as part of api/discriptor request so we can get the user id on the sever side
  return {
    session: session.sessionId,
    monthlyLimit: monthlyLimit,
    plan: session.plan
  };
}) satisfies PageServerLoad;



/***
 * ACTIONS
 */

export const actions: Actions = {
  upload: async ({ request }) => {

    const data = await request.formData();
    const file = data.get('file') as File;

    if (!file) {
      return { success: false, message: 'No file provided.' };
    }

    const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'];

    if (!acceptedFileTypes.includes(file.type)) {
      return { success: false, message: 'File type not accepted.' };
    }

    const keyJson = JSON.parse(BUCKET_KEY_FILE);
    const storage = new Storage({ credentials: keyJson });
    const bucketName = BUCKET_NAME;
    const bucket = storage.bucket(bucketName);
    try {
      // Function to convert a stream to a buffer
      const streamToBuffer = async (stream: any) => {
        const reader = stream.getReader();
        let chunks = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunks.push(value);
        }

        return Buffer.concat(chunks);
      };

      const fileName = file.name;
      const fileStream = file.stream();
      const buffer = await streamToBuffer(fileStream);

      let filePath = fileName;
      if (['image/png', 'image/webp', 'image/avif'].includes(file.type)) {

        filePath = `converted-${filePath.split('.').slice(0, -1).join('.')}.jpg`;
        const convertedBuffer = await sharp(buffer).jpeg().toBuffer();
        await bucket.file(filePath).save(convertedBuffer);
        //await bucket.file(filePath).makePublic();  // Make the file public

      } else {
        await bucket.file(fileName).save(buffer);
        //await bucket.file(fileName).makePublic();  // Make the file public
        filePath = fileName;  // Set filePath to fileName for public URL generation
      }

      const publicUrl = `${BUCKET_URL}/${bucketName}/${filePath}`;
      console.log(publicUrl);

      return {
        success: true,
        message: 'File uploaded successfully.',
        url: publicUrl,
        type: 'file'
      };
    } catch (error) {
      return { success: false, message: error.message };
    }

  },
  imageUrl: async ({ request }) => {
    const data = await request.formData();
    const link = data.get('imageUrl');

    if (typeof link !== 'string') {
      console.log('File type not accepted.');
      return { success: false, message: 'Invalid URL provided.' };
    }

    try {
      const response = await fetch(link);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${link}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      const acceptedFileTypes = ['image/png', 'image/webp', 'image/avif', 'image/jpg', 'image/jpeg'];
      
      if (!contentType || !acceptedFileTypes.includes(contentType)) {
        console.log('File type not accepted.' + contentType)
        return { success: false, message: 'File type not accepted.' };
      }

      const buffer = await response.arrayBuffer();
      const bucketName = BUCKET_NAME; // Replace with your bucket name
      const keyJson = JSON.parse(BUCKET_KEY_FILE); // Your Google Cloud credentials

      const storage = new Storage({ credentials: keyJson });
      const bucket = storage.bucket(bucketName);
      let fileName = link.split('/').pop().split('.')[0] + '.jpg';

      // Convert to JPEG
      const convertedBuffer = await sharp(Buffer.from(buffer))
        .jpeg()
        .toBuffer();

      await bucket.file(fileName).save(convertedBuffer, {
        contentType: 'image/jpeg',
      });

      const publicUrl = `${BUCKET_URL}/${bucketName}/${fileName}`;
      return {
        success: true,
        message: 'File uploaded successfully.',
        url: publicUrl,
        type: 'file',
      };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}
