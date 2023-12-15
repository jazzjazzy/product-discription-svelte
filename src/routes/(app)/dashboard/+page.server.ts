import type { Actions } from './$types';
import { Storage } from '@google-cloud/storage';
import { BUCKET_KEY_FILE, BUCKET_NAME, BUCKET_URL, } from '$env/static/private';
import { OPENAI_API_KEY } from '$env/static/private';
import OpenAI from 'openai';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';


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
    try {
      const data = await request.formData();
      const imageFile = data.get('file') as File;
      const openai = new OpenAI({
        apiKey: OPENAI_API_KEY, // Replace with your actual API key
      });



      if (!imageFile) {
        return { success: false, message: 'File type not accepted.' };
      }

      const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/avif'];

      if (!acceptedFileTypes.includes(imageFile.type)) {
        return { success: false, message: 'File type not accepted.' };
      }

      // I still don't knnow why I have to do all this to get the image to upload
      // wwe go from image to buffer to blob to file
      // but it works so I am not going to mess with it

      const imageArrayBuffer = await imageFile.arrayBuffer();
      const imageBuffer = Buffer.from(imageArrayBuffer);
      const blob = new Blob([imageBuffer], { type: imageFile.type });
      const imageFileFromBlob = new File([blob], "image.jpg", { type: imageFile.type });


      // Specify your purpose for uploading the image
      const purpose = "assistants"; // Replace with your actual purpose

      // Upload the image
      const file = await openai.files.create({
        file: imageFileFromBlob,
        purpose,
      });

      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            "role": "system",
            "content": "you are a professional Esty copie writer, writing a 500-word description of an image of a product discribed"
          },
          {
            "role": "user",
            "content": `description of the image`
          },
        ],
      })

      console.log('chatCompletion', chatCompletion.choices[0].message?.content);

      const filedelete = await openai.files.del(file.id);


      console.log("filecreate", file);

      console.log("fileDelete", filedelete);

      const list = await openai.files.list();

      console.log("list", list);

      for (const item of list.data) {
        await openai.files.del(item.id);
      }

    } catch (error: any) {
      console.error(error);
      return { success: false, message: error.message };
    }
  }
};

async function deleteImage(openai: OpenAI, file: string) {
  try {
    await openai.files.delete(file);
  } catch (error) {
    console.error(error);
  }

}
