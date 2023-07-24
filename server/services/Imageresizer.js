import sharp from "sharp";
const MAX_IMAGE_SIZE_LIMIT = 768;

export async function resizeImage(filepath, destinationFilePath) {
  await sharp(filepath)
    .resize(MAX_IMAGE_SIZE_LIMIT)
    .webp({ quality: 80 })
    .toFile(destinationFilePath);
}
