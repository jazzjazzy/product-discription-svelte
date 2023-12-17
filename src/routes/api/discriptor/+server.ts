import type { RequestHandler } from './$types';
import { getImageDescription, getEtsyDescription } from '$lib/helpers/openAi';
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async ({ request }) => {
    try {

        const { imageUrl, storeDescription, productDescription } = await request.json()

        const imageDescription = await getImageDescription(productDescription, imageUrl)

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

        const etsyDescription = await getEtsyDescription(storeDescription, productDescription, imageDescription)

        if (!etsyDescription || etsyDescription === "" || etsyDescription < 50) {
            return json({
                status: 409,
                body: {
                    message: 'Error executing script no discription returned or image type is not valid.',
                },
            });
        }

        return json({
            status: 200,
            body: etsyDescription,
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