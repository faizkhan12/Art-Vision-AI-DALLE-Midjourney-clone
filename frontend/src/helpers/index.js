import { surpriseMePrompts } from "../constants";
import FileSaver from "file-saver";

/*
Function that returns random index at each time
*/
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  // no need to show the same prompt twice in a row
  if (randomPrompt === prompt) {
    return getRandomPrompt(prompt);
  }
  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}

export const convertFileToBase64 = (file) =>
  new Promise((resolve, reject) => {
    console.log("converting image to Base64");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    console.log("image CONVERTED");
  });
