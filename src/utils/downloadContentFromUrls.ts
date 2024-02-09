import axios from 'axios';
export const downloadContentsFromUrls = async (urls: string[]): Promise<any[]> => {
    try{
    const promises: Promise<any>[] = [];
    for (const url of urls) {
        promises.push(
            axios.get(url).then(response => response.data)
        );
    }
        return await Promise.all(promises);
    }catch (error){
        return [];
    }
}
