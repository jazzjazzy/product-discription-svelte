
import { SEGMIND_ESRGAN_URL, SEGMIND_KEY, BUCKET_NAME, BUCKET_URL } from '$env/static/private';
import fs from 'fs';
import { Storage } from '@google-cloud/storage';
import axios from 'axios';
import path from 'path';


const storage = new Storage();
const bucketName = BUCKET_NAME; // Replace with your bucket name
const googleStorageUrl = `${BUCKET_URL}/${bucketName}`;
const segmindApiUrl = SEGMIND_ESRGAN_URL;
const segmindApiKey = SEGMIND_KEY; // Replace with your Segmind API key

const SCALE = 4

/**
 * This is the path details of a file
 */
type pathDetails = {
  originPath: string,
  destinationPath: string,
  filename: string,
  ext: string
  finalExt: string
}

/**
 * this takes a local file and upscales it in segmind and saves it locally
 * 
 * @param directoryPath 
 * @deprecated we are now using the replicate api to do this
 */
export async function checkAndProcessImages(directoryPath: string): Promise<void> {
  try {

    const files = await findPNGFiles(directoryPath)

    for (const file of files) {
      if (file.endsWith('.png')) {

        const fileDetails = await getFilePathDetails(file)
        
        //orginal file name
        const fileName = `${fileDetails.filename}${fileDetails.ext}`;
        //google storage with orginal storage name
        const imageUrl = `${googleStorageUrl}/${fileName}`;
        const newFile = `${fileDetails.filename}.${fileDetails.finalExt}`
        //new high res direcotry and filename as jpg
        const newPath = fileDetails.destinationPath

        //upload image to google storage
        await uploadToGoogleStorage(fileDetails.originPath, fileName);
        //send image url to segmind for processing and return buffer of image
        const segmindImageBuffer = await processImage(imageUrl);
        //save the returned image locally
        await saveImageLocally(segmindImageBuffer, newPath, newFile);
        //delete the orginal image from google storage and local file system
        await deleteFromGoogleStorage(fileName, fileDetails.originPath);
      }
    }

    console.log(`Succesfully Processed a total of ${files.length} images`);
    
  } catch (error) {
    console.error('Error checking and processing images:', error);
  }
}

/**
 * will take a URL and return the path details
 * 
 * @param filePath information on the origin and destination of the file, file name and extension
 * @returns 
 */
export async function getFilePathDetails(filePath: string): Promise <pathDetails>{
  
  const dirPath = path.dirname(filePath);
  const fileNameWithExtension = path.basename(filePath);
  const extension = path.extname(filePath);
  const fileName = fileNameWithExtension.slice(0, fileNameWithExtension.length - extension.length);
  let newPath =  dirPath.replace('LowRes', 'HighRes'); //todo: may remove this as it was from when wh used all local files
  
  let response:pathDetails = {
    originPath: dirPath,
    destinationPath: dirPath,
    filename: fileName,
    ext: extension,
    finalExt: 'jpg'
  }

  return response;
}


/**
 * upload file to google storage
 * 
 * @param directoryPath directory path of the file to upload
 * @param fileName name of the file to upload
 */
async function uploadToGoogleStorage(directoryPath: string, fileName: string): Promise<void> {
  const filePath = `${directoryPath}/${fileName}`;
  const bucket = storage.bucket(bucketName);

  await bucket.upload(filePath, {
    destination: fileName,
  });

  console.log(`Uploaded ${fileName} to Google Cloud Storage.`);
}


/**
 * upscale if from a url and return a buffer of the image
 * 
 * @param imageUrl the url of the image to upsacle
 * @returns 
 */
async function processImage(imageUrl: string): Promise<Buffer> {
  try {
    const data = JSON.stringify({
      "scale": SCALE,
      "imageUrl": imageUrl
    });

    const response = await axios.post(
      segmindApiUrl,
      data,
      { responseType: 'arraybuffer',
        headers: {
          'x-api-key': segmindApiKey,
          'Content-Type': 'application/json'
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}



/**
 * find all png files in a directory
 * 
 * @param directory 
 * @returns 
 */
async function findPNGFiles(directory: string): Promise<string[]> {
  try {
    const files = await fs.promises.readdir(directory);

    const pngFiles: string[] = [];

    for (const file of files) {
      const filePath = path.join(directory, file);
      const fileStats = await fs.promises.stat(filePath);

      if (fileStats.isFile() && path.extname(file).toLowerCase() === '.png') {
        pngFiles.push(filePath);
      } else if (fileStats.isDirectory()) {
        const subDirectoryFiles = await findPNGFiles(filePath);
        pngFiles.push(...subDirectoryFiles);
      }
    }

    return pngFiles;
  } catch (error) {
    console.error('Error finding PNG files:', error);
    throw error;
  }
}

/**
 * save a buffered file to the local file system
 * 
 * @param data 
 * @param directoryPath 
 * @param fileName 
 */

export async function saveImageLocally(data: Buffer, directoryPath:string,  fileName: string): Promise<void> {
  try {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }

    const filePath = path.join(directoryPath, fileName);
    
    // Write the file to the specified path
    fs.writeFileSync(filePath, data);
    
    console.log(`Saved image as ${fileName} locally.`);
  } catch (error) {
    console.error('Error saving image locally:', error);
    throw error;
  }
}


async function deleteFromGoogleStorage(fileName: string, originPath: string): Promise<void> {
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  await file.delete();

  await fs.promises.unlink(path.join(originPath, fileName));

  console.log(`Deleted ${fileName} from Google Cloud Storage.`);
}
