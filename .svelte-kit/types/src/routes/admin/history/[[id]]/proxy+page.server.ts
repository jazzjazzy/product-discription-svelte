// @ts-nocheck
import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async ({ params }) => {
    const { id } = params;
    const history = await prisma.descriptionHistory.findUnique({ where: { id: id } });

    return { history: history };
}) satisfies PageServerLoad;

export const actions = {
    create: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        console.log("formData", formData);
        const newUser = await prisma.descriptionHistory.create({
            data: {
                user_id: formData.user_id,  // Replace with the new first name
                store_type: formData.store_type,      // Replace with the new surname
                image_location: formData.image_location,          // Replace with the new email
                image_type: formData.image_type,        // Replace with the new role
                image_description: formData.image_description,  // Replace with the new Stripe customer ID
                shop_description: formData.shop_description,      // Replace with the new subscription ID
                product_description: formData.product_description,  // Replace with the new Stripe customer ID
                charactor_size: parseInt(formData.charactor_size),      // Replace with the new subscription ID
                temperature: parseFloat(formData.temperature),  // Replace with the new Stripe customer ID
                generated_title: formData.generated_title,      // Replace with the new subscription ID
                generated_description: formData.generated_description,  // Replace with the new Stripe customer ID
                generated_keywords: formData.generated_keywords,      // Replace with the new subscription ID
                count_title: parseInt(formData.count_title),  // Replace with the new Stripe customer ID
                count_description: parseInt(formData.count_description),      // Replace with the new subscription ID
                generated_json: formData.generated_json,  // Replace with the new Stripe customer ID
                created_at: new Date(),  // Optionally update the updated_at field
                // Add any other fields you want to update
            },
        });
        console.log(newUser);
    },
    update: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());
        console.log("formData", formData);
        const updatedUser = await prisma.descriptionHistory.update({
            where: {
                id: formData.id,  // Replace with the user's ID
            },
            data: { // Replace with the new first name
                store_type: formData.store_type,      // Replace with the new surname
                image_location: formData.image_location,          // Replace with the new email
                image_type: formData.image_type,        // Replace with the new role
                image_description: formData.image_description,  // Replace with the new Stripe customer ID
                shop_description: formData.shop_description,      // Replace with the new subscription ID
                product_description: formData.product_description,  // Replace with the new Stripe customer ID
                charactor_size: parseInt(formData.charactor_size),      // Replace with the new subscription ID
                temperature: parseFloat(formData.temperature),  // Replace with the new Stripe customer ID
                generated_title: formData.generated_title,      // Replace with the new subscription ID
                generated_description: formData.generated_description,  // Replace with the new Stripe customer ID
                generated_keywords: formData.generated_keywords,      // Replace with the new subscription ID
                count_title: parseInt(formData.count_title),  // Replace with the new Stripe customer ID
                count_description: parseInt(formData.count_description),      // Replace with the new subscription ID
                generated_json: formData.generated_json,  // Replace with the new Stripe customer ID
                updated_at: new Date(),  // Optionally update the updated_at field
                // Add any other fields you want to update
            },
        });
        console.log(updatedUser);

    },
    delete: async ({ request }) => {
        const formData = Object.fromEntries(await request.formData());

        const updatedUser = await prisma.descriptionHistory.delete({
            where: {
                id: formData.id,  
            }
        });
    }
    
};null as any as PageServerLoad;