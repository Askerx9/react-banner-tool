import fse from 'fs-extra';
import { createServer } from '../utils/create-server';
import getAllDirsFromPath from '../utils/getAllDirsFromPath';

interface Args {
    dir: string;
    port: string;
  }

export const dev = async ({dir, port}: Args) => {
    try {
        const dirs = getAllDirsFromPath(dir);

        dirs?.forEach(dir => {
            if(!fse.existsSync(dir)){
                throw new Error(`Directory ${dir} does not exist`);
            }
        });

        await createServer('dev', dir);
        console.log(`Watching ${dir}`);

    } catch (error) {
        console.error(error);
    }
}