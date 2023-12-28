import "replicate";
async function getSelectedImageDescription(imageUrl, productDescription, replicate) {
  try {
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
          max_new_tokens: 3e3,
          max_length: 4e3
        }
      }
    );
    return prediction;
  } catch (error) {
    console.error("Replicate getSelectedImageDescription Error executing script:", error);
    throw error;
  }
}
export {
  getSelectedImageDescription as g
};
