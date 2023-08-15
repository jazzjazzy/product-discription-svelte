import { checkAndProcessImages }  from '$lib/helpers/scriptHelper';
import { json } from '@sveltejs/kit'
import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ params }) => {
  try {
    const directoryPath = 'static/storage/LowRes';
    //await checkAndProcessImages(directoryPath);

    return {
      status: 200,
      body: {
        message: 'Script executed successfully.',
      },
    };
  } catch (error) {
    console.error('Error executing script:', error);

    return {
      status: 500,
      body: {
        message: 'Error executing script.',
      },
    };
  }
}