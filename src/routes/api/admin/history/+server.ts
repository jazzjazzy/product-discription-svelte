import type { RequestHandler } from './$types';
import prisma from '$lib/server/prisma'
import { json } from '@sveltejs/kit'

export const POST: RequestHandler = async () => {

    const user = await prisma.descriptionHistory.findMany({orderBy: {created_at: 'desc'}});

    const maxLength = 50; // Maximum length of description
    user.forEach(item => {
        if (item.image_description && item.image_description.length > maxLength) {
            item.image_description = item.image_description.substring(0, maxLength) + '...';
        }
        if (item.shop_description && item.shop_description.length > maxLength) {
            item.shop_description = item.shop_description.substring(0, maxLength) + '...';
        }
        if (item.product_description && item.product_description.length > maxLength) {
            item.product_description = item.product_description.substring(0, maxLength) + '...';
        }
        if (item.generated_title && item.generated_title.length > maxLength) {
            item.generated_title = item.generated_title.substring(0, maxLength) + '...';
        }
        if (item.generated_description && item.generated_description.length > maxLength) {
            item.generated_description = item.generated_description.substring(0, maxLength) + '...';
        }
        if (item.generated_keywords && item.generated_keywords.length > maxLength) {
            item.generated_keywords = item.generated_keywords.substring(0, maxLength) + '...';
        }
    });

    return json({
        status: 200,
        body: {
            message: user.length,
            user: user
        }
    });
}