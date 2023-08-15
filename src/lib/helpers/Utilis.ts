import fs from 'fs';
import axios from 'axios';
import path from 'path';


/**
 * This will taking in comma seperated list and s string size and return a string 
 * with the keywords that are over the size limit highlighted in red 
 *  
 * @param keywords 
 * @param size 
 * @returns string 
 */

export function checkStringSize(keywords: string, size: number): string {

    let keywordsCleaned: string | null = stripHtmlfromString(keywords);

    if (!keywordsCleaned) {
        return ''
    }

    let keyList: string[] = keywordsCleaned.split(',');
    let revisedKeyword: string[] = [];
    for (const key of keyList) {
        console.log('key', key, key.length);
        if (key.length > size) {
            console.log('keywordrevised', key);
            let keyword = `<span class="badge variant-filled text-white bg-red-600">${key}</span>`;
            revisedKeyword.push(keyword);
        } else {
            let keyword = `<span class="badge variant-filled text-black bg-gray-300">${key}</span>`;
            revisedKeyword.push(keyword);
        }
    }
    return revisedKeyword.join(',');
}

/**
 * This will take in a string and remove all html tags from it
 * 
 * @param str string that may contain html tags
 * @returns string|null  
 */
export function stripHtmlfromString(str: string): string | null {
    if ((str === null) || (str === ''))
        return null;
    else
        str = str.toString();

    return str.replace(/<[^>]*>/g, '');
}


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