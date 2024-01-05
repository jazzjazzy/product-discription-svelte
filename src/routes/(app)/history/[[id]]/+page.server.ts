import type { PageServerLoad } from './$types';
import prisma from '$lib/server/prisma';

export const load = (async ({ params, locals, fetch }) => {
    let session = await locals.auth.validate();

    let historyRecord = null;
    let historyList = null;

    const { id } = params;
    if (id) {
        historyRecord = await prisma.descriptionHistory.findUnique({ where: { id: id, user_id: session.user.userId } });
    } else {
        try {
            const response = await fetch('/api/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    token: session.sessionId
                 })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let responseData = await response.json();
            if(responseData.status == 200){
                historyList = responseData.body.user;
            }
        } catch (err) {
            console.error('Fetch error:', err);
        }
    }

    return { historyRecord: historyRecord, historyList: historyList };
}) satisfies PageServerLoad;