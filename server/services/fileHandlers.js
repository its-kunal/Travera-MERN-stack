import fs from "fs";

export function deleteFile(filepath) {
  try {
    fs.existsSync(filepath);
  } catch (err) {
    throw new Error("File not found");
  }
  try {
    fs.unlinkSync(filepath);
  } catch (err) {
    throw new Error("File not deleted");
  }
}
