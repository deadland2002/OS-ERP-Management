import * as fs from 'node:fs';

const deleteFile = async (path: string) => {
  try {
    await new Promise((resolve) => {
      fs.rm(`.${path}`, () => {
        resolve(1);
      });
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default deleteFile;
