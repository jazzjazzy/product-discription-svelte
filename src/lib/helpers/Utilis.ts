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


