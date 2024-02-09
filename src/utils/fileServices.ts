import fs from 'fs';
import path from 'path';

export const  listFilesWithExtension = (directory: string, extension: string): string[] => {
    const files: string[] = [];
    try{
        const filesDirectory = path.join(__dirname, directory);
        const contents = fs.readdirSync(filesDirectory);
        for (const item of contents) {
            const itemPath = path.join(filesDirectory, item);
            const stats = fs.statSync(itemPath);
            if (stats.isFile() && item.endsWith(extension)) {
                files.push(item);
            }
        }
        return files;
    }catch (e){
        return [];
    }
}

export const  getFileContent = (directory: string, fileName: string) => {
    let fileContent: object= {};
    try{
        const fileDirectory = path.join(__dirname, directory, fileName);
        fileContent = fs.readFileSync(fileDirectory);
        return fileContent;
    }catch (e){
        return {};
    }
}

