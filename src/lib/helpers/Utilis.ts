/**
 * This will taking in comma seperated list and check string size and returning a formated html
 * with the keywords that are over the size limit highlighted in red 
 *  
 * @param keywords 
 * @param size 
 * @returns string 
 */

export function formateKeywordstring(keywords: string, size: number): string {

    let keywordsCleaned: string | null = stripHtmlfromString(keywords);

    if (!keywordsCleaned) {
        return ''
    }

    let keyList: string[] = keywordsCleaned.split(',');
    let revisedKeyword: string[] = [];
    for (const key of keyList) {
        if (key.length > size) {
            let keyword = `<span class="badge variant-filled text-white bg-red-600 rounded-lg">${key}</span>`;
            revisedKeyword.push(keyword);
        } else {
            let keyword = key;
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

export function formatDateToLocal(dateString : Date) {
    const dateObject = new Date(dateString);
    return dateObject.toLocaleString(); // Or any other format you prefer
}


