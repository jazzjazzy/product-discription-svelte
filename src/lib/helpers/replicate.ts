import { REPLICATE_API_TOKEN } from '$env/static/private';
import Replicate, { type Prediction } from 'replicate';

/**
 * call replicate to get a description of the image 
 * @param directoryPath 
 */
export async function getSelectedImageDescription(imageUrl: string, productDescription: string, replicate:Replicate): Promise<Prediction> {
    try {
       /// const replicate = new Replicate({
        //    auth: REPLICATE_API_TOKEN,
        //});

        console.log("image url", imageUrl);

        const prediction = await replicate.predictions.create(
            {
                version: "b96a2f33cc8e4b0aa23eacfce731b9c41a7d9466d9ed4e167375587b54db9423",
                input: {
                    image: imageUrl,
                    prompt: productDescription + " and its style in 500 words",
                    num_beams: 5,
                    temperature: 1.26,
                    top_p: 0.9,
                    repetition_penalty: 1,
                    max_new_tokens: 3000,
                    max_length: 4000,
                }
            })
       // console.log("discript", productDescription + " and its style in 500 words");
       // console.log("image description output", prediction);

        return prediction
    } catch (error) {
        console.error('Replicate getSelectedImageDescription Error executing script:', error);
        throw error;
    }
}


/**
 * use replicate to get a upscaled image
 * 
 * @param imageUrl 
 * @param scale 
 * @returns 
 */
export async function getUpScaleImage(imageUrl: string, scale: number): Promise<any> {
    try {
        const replicate = new Replicate({
            auth: REPLICATE_API_TOKEN,
        });

        const output = await replicate.run(
            "nightmareai/real-esrgan:42fed1c4974146d4d2414e2be2c5277c7fcf05fcc3a73abf41610695738c1d7b",
            {
                input: {
                    image: imageUrl,
                    scale: scale,
                    face_enhance: false,
                }
            })

        console.log(output);
        return output

    } catch (error) {
        console.error('Replicate getUpScaleImage Error processing image:', error);
        throw error;
    }
}
