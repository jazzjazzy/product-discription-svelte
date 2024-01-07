import type { RequestHandler } from './$types';
import { getImageDescription, getEtsyDescription } from '$lib/helpers/openAi';
import { json } from '@sveltejs/kit'
import prisma from '$lib/server/prisma'
import type { chatProductSetting } from '$lib/types/product';
import type { validSession } from '$lib/types/user';
import { validateBySessionId, isPlanLimitReached } from '$lib/helpers/user'


export const POST: RequestHandler = async ({ request }) => {
    try {
        const { imageUrl, storeDescription, productDescription, temperature, charatorCount, storeType, token, plan } = await request.json()

        let charatorCountSet = charatorCount;
        let temperatureSet = temperature;

        // FORCE SETTING FOR NANO PLAN OR TRIAL
        if (!plan || plan === 'Nano') {
            charatorCountSet = 500;
            temperatureSet = 0.2;
        }

        // note: token is the session id, just tring to obfuscate what it really is
        const user: validSession = await validateBySessionId(token)


        // check if session for user is valid, if not then no page found
        if (!user) {
            return json({
                status: 409,
                body: {
                    message: 'No valid page was found',
                },
            });
        }

        // this is user.user_id as that what its called in the database, not user.userId
        let monthlyLimit = await isPlanLimitReached(user.user_id, plan)


        const imageDescription = await getImageDescription(productDescription, imageUrl)

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


        let chatProductSetting: chatProductSetting = {
            storeDescription: storeDescription,
            productDescription: productDescription,
            imageDescription: imageDescription,
            temperature: temperatureSet,
            charatorCount: charatorCountSet,
        }

        const etsyDescription = await getEtsyDescription(chatProductSetting)

        if (!etsyDescription || etsyDescription === "" || etsyDescription < 50) {
            console.log('Error executing script no discription returned or image type is not valid.');
            return json({
                status: 409,
                body: {
                    message: 'Error executing script no discription returned or image type is not valid.',
                },
            });
        }

        if (etsyDescription) {
            const { product_title, product_description, product_keywords } = etsyDescription;

            let imagetype = "base64";
            if (imageUrl.startsWith("https://") || imageUrl.startsWith("http://")) {
                imagetype = "url";
            }
            // count characters for title and description
            let pageDescriptionCount = product_description.length;
            let pageTitleCount = product_title.length;

            let pageTitle = product_title;
            let pageDescription = product_description;
            let pageKeywords = product_keywords;
            try {
                const newHistory = await prisma.descriptionHistory.create({
                    data: {
                        user_id: user?.user_id,
                        store_type: 'etsy',
                        image_location: imageUrl,
                        image_type: imagetype,
                        image_description: imageDescription,
                        shop_description: storeDescription,
                        product_description: productDescription,
                        temperature: temperatureSet,
                        charactor_size: charatorCountSet,
                        generated_title: pageTitle,
                        generated_description: pageDescription,
                        generated_keywords: pageKeywords,
                        generated_json: etsyDescription,
                        count_title: pageTitleCount,
                        count_description: pageDescriptionCount,
                    },
                });
            } catch (error) {
                console.error(error);
            }

        } else {
            console.log('No results found or results array is empty');
        }

        return json({
            status: 200,
            body: { result: { etsyDescription }, monthlyLimit }
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