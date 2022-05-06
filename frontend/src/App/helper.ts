/*
    This file contains functions that assist other features.
*/

/**
 * Convert the data from a given url to a file object.
 * @param dataurl The url of the data to be converted
 * @param filename The file name of the returned file
 * @returns The File type object of the url
 */
export function dataURLtoFile(dataurl: string, filename: string) {
    var arr = dataurl.split(','),
        mime = arr[0]!.match(/:(.*?);/)![1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}