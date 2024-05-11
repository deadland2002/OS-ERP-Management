import { v4 as uuid4 } from 'uuid';
import * as fs from 'node:fs';
import { Role } from '@prisma/client';

const saveFile = async (file: Express.Multer.File[], role: Role) => {
  const imageFile = file[0];
  const uniqueFileName = uuid4();

  const filePath = `/files/${role}/${uniqueFileName}.jpg`;
  const finalPath = `./public${filePath}`;
  try {
    await new Promise((resolve, reject) => {
      fs.writeFile(finalPath, imageFile.buffer, (err) => {
        if (err) return reject(err);

        return resolve(1);
      });
    });
    return filePath;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default saveFile;
