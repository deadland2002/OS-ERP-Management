import { v4 as uuid4 } from 'uuid';
import * as fs from 'node:fs';

const saveFile = async (file: Express.Multer.File[]) => {
  const imageFile = file[0];
  const uniqueFileName = uuid4();

  const filePath = `/files/students/${uniqueFileName}.jpg`;
  const finalPath = `./public${filePath}`;
  try {
    await new Promise((resolve) => {
      fs.writeFile(finalPath, imageFile.buffer, () => {
        resolve(1);
      });
    });
    return filePath;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default saveFile;
