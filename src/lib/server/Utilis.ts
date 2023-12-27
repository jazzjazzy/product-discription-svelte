export const csr = false;
import fs from 'fs';
import axios from 'axios';
import path from 'path';



/**
 * uses a url to download an image and save it locally
 * 
 * will always save in the static folder, so images can be seen
 * 
 * @param uri a url to an image
 * @param directoryPath path to save the image
 * @param fileName the name of the file to save
 * @returns directory path of image
 */
export async function downloadImageLocally(uri: string, directoryPath: string, fileName: string): Promise<string> {
    try {

        //we store the images in the static folder so it can be seen
        const directory: string = path.join('static', directoryPath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory, { recursive: true });
        }

        const response = await axios({
            url: uri,
            method: 'GET',
            responseType: 'stream',
        });

        const asyncPipeline = promisify(pipeline);
        await asyncPipeline(response.data, fs.createWriteStream(path.join(directory, fileName)));

        //we return URL path to the image, which will not include the static folder
        return path.join(directoryPath, fileName);
    } catch (error) {
        console.error('Error saving image locally:', error);
        throw error;
    }
}

/**
 * 
 * @param blob 
 * @returns 
 */

export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(blob);
    });
}


export function convertBigIntToDate(data: any) {
    return JSON.stringify(data, (_, value) => {
        if (typeof value === 'bigint') {
            const timestamp = Number(value);
            const now = Date.now();
            let diff = timestamp - now; // Difference in milliseconds

            const isFuture = diff > 0;
            diff = Math.abs(diff) / 1000; // Convert to absolute difference in seconds

            const days = Math.floor(diff / (3600 * 24));
            diff -= days * 3600 * 24;

            const hours = Math.floor(diff / 3600);
            diff -= hours * 3600;

            const minutes = Math.floor(diff / 60);
            diff -= minutes * 60;

            const seconds = Math.floor(diff);

            let durationStr = "";
            if (days > 0) {
                durationStr += `${days}d `;
            }
            durationStr += `${hours}h ${minutes}m ${seconds}s`;

            return (isFuture ? "" : "-") + durationStr;
        }
        return value;
    });
}

export function stringToBoolean(str) {
    if(str === undefined) return false;
    switch (str.toLowerCase().trim()) {
        case 'true':
        case 'yes':
        case '1':
            return true;
        case 'false':
        case 'no':
        case '0':
        case null:
            return false;
        default:
            return Boolean(str);  // Fallback for other string content
    }
}
