import type { RequestHandler } from './$types';
import { getSelectedImageDescription } from '$lib/helpers/replicate';
import { json } from '@sveltejs/kit'
import Replicate, { type Prediction } from 'replicate';
import { REPLICATE_API_TOKEN } from '$env/static/private';



export const POST: RequestHandler = async ({ request }) => {
    try {
        const { imageUrl, storeDescription, productDescription } = await request.json()
        // console.log('imageUrl', imageUrl);

        //lets get a discription of the image to create a prompt for the etsy description

        const replicate: Replicate = new Replicate({
            // get your token from https://replicate.com/account
            auth: REPLICATE_API_TOKEN,
        });

        let imageDescription: string = '';
        const imagePredition: Prediction = await getSelectedImageDescription(imageUrl, productDescription, replicate);


        //console.log('imageDescription', imageDescription);
        while (true) {
            let prediction: Prediction = await replicate.predictions.get(imagePredition.id)


            if (prediction.status === 'succeeded') {

                const response = await fetch(prediction.urls.get, {
                    headers: {
                        'Authorization': `Token ${REPLICATE_API_TOKEN}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    imageDescription = data.output
                };

                break;
            }
        }


        console.log('imageDescription', imageDescription);

        // since we a asking for a description if there is a problem it will return a conversationanl about error 
        // not an error code, so we need to check for that by length of the string as it will be under 50 characters
        // todo: we should check for the error message in the string
        if (!imageDescription || imageDescription === "" || imageDescription.length < 50) {
            return json({
                status: 409,
                body: {
                    message: 'Error executing script no discription returned or image type is not valid.',
                },
            });
        }

        return json({
            status: 200,
            body: imageDescription,
        });
    } catch (error) {
        console.error('Error executing script:', error);

        return json({
            status: 500,
            body: {
                message: 'Error executing script while getting image discription.',
            },
        })
    }
};