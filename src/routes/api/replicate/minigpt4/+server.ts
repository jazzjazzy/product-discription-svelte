import { getSelectedImageDescription } from '$lib/helpers/replicate';
import { getEtsyDescription } from '$lib/helpers/openAi';
import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit';


export const POST: RequestHandler = async ({ request }) => {

  try {
    const { imageUrl, storeDescription, productDescription } = await request.json()
    console.log('imageUrl', imageUrl);
    //lets get a discription of the image to create a prompt for the etsy description
    const imageDescription = await getSelectedImageDescription(imageUrl, productDescription);
    //create the etsy description from the image description
    const etsy: any = await getEtsyDescription(storeDescription, productDescription, imageDescription)
    //clean up the etsy description
    let etsyDescription = cleanEstyDescription(etsy);

    if (!etsyDescription) {
      return json({
        status: 409,
        body: {
          message: 'Error executing script no discription returned.',
        },
      });
    }

    let body = JSON.parse(etsyDescription);
    let { title, description, keywords } = body;

    if (!title || !description || !keywords) {
      return json({
        status: 409,
        body: {
          message: 'Error executing script no discription returned.',
        },
      });
    }

    let descriptionJason = {
      title: title,
      description: description,
      keywords: keywords,
    }

    console.log('description', description);
    console.log('keywords', keywords);

    return json({
      status: 200,
      body: descriptionJason,
    });
  } catch (error) {
    console.error('Error executing script:', error);

    return json({
      status: 500,
      body: {
        message: 'Error executing script.',
      },
    });
  }
}

/**
 * The etsy description comes back with a lot of extra characters that need to be removed
 * 
 * @param dirtyString 
 * @returns 
 */
function cleanEstyDescription(dirtyString: string) {
  if (!dirtyString) return;
  try {

    let str = dirtyString;
    let regEx = /"([\s\S]*?)"\s*:\s*"([\s\S]*?)"/g;
    let match;
    let desresult: { [key: string]: string } = {};
    while ((match = regEx.exec(str)) != null) {// "key1: value1", "key2: value2"
      //replace the carrage returns with </br> as the break json
      let regexCR = /(\r\n|\n|\r)/gm;
      let dirtyClear = match[2].replace(regexCR, '</br>');

      desresult[match[1]] = dirtyClear;
    }

    console.log('desresult', JSON.stringify(desresult))

    return JSON.stringify(desresult)

  } catch (error) {
    console.error('cleanEstyDescription Error executing script:', error);
    throw error;
  }
}