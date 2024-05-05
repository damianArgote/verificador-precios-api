import fs from 'fs';

export const guardarFile = (file) => {

    const newPath = `./uploads/verificador-precios.xlsx`;

    fs.renameSync(file.path,newPath);

    return newPath

}