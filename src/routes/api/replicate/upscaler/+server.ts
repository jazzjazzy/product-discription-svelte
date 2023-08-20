import { getUpScaleImage } from '$lib/helpers/replicate';
import { json } from '@sveltejs/kit'
import axios from "axios";
import fs from 'fs';
import path from 'path';
import type { RequestHandler } from './$types';

import { getFilePathDetails } from '$lib/helpers/scriptHelper';
import { downloadImageLocally } from '$lib/helpers/Utilis';
import { pipeline } from 'stream';
import { promisify } from 'util';

export const POST: RequestHandler = async ({ request }) => {

    try {

        const { imageUrl, scale, projectName } = await request.json()

        console.log(imageUrl)
        console.log(scale)

        const upscaleImage: string = await getUpScaleImage(imageUrl, scale);

        console.log('upscaleImage', upscaleImage);

        const fileDetails = await getFilePathDetails(upscaleImage)
  
        //new file name
        const fileName = `HighRes-${fileDetails.filename}${fileDetails.ext}`;
        // url path in the href path 
        const filePath = `/storage/HighRes/${projectName}/`;

        //save the image locally and return the url path
        const imageUrlPath = await downloadImageLocally(upscaleImage, filePath, fileName);
        
        //add the static path to the local file path
        const directoryPath = path.join('static', imageUrlPath);

        console.log(`file saved locally at ${directoryPath}`);

        return json({
            status: 200,
            body: {
                message: 'Script executed successfully.',
                newImage: imageUrlPath
            }
        });

    } catch (error) {
        console.error('Error executing script:', error);
        return json({
            status: 501,
            body: {
                message: 'Error executing script:', error,
            }
        });

    }


};