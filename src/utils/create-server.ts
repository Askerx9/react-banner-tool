import { watchInstance, watch } from './watch';
import { detect } from 'detect-package-manager';
import { CURRENT_PATH } from '../constants';
import { packageManager } from '../types';
import { convertToAbsPath } from './shared';

export const createServer = async (
    type: 'dev' | 'build' | 'start', 
    dir: string
) => {
    const cwd = {rootDir: CURRENT_PATH}
    const packageManager: packageManager = await detect({cwd: cwd.rootDir}).catch(() => 'npm')
    const bannersDir = convertToAbsPath(dir)
    
    if(type === 'dev'){
        console.log(`Starting ${packageManager} dev server in ${bannersDir}`)
        const watchInst = watchInstance(bannersDir)

        watch(watchInst)
    }    
}