import sharp from "sharp";
const MAX_IMAGE_SIZE_LIMIT = 768;

export function resizeImage(filepath, destinationFilePath) {
  sharp(filepath)
    .resize(MAX_IMAGE_SIZE_LIMIT)
    .webp({ quality: 80 })
    .toFile(destinationFilePath);
}
