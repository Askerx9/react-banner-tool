import chokidar, {FSWatcher} from 'chokidar'
import path from 'path'
import { compileReact } from '../tasks/javascript'
import { REACT_EXT, DEFAULT_BANNERS_DIR } from '../constants'
import getAllDirsFromPath from './getAllDirsFromPath'

export const watchInstance = (dir: string) => {
    const cwd = dir.split(path.sep).slice(0, -1).join(path.sep)
    const dirs = getAllDirsFromPath(dir)?.map(dir => `${cwd}${path.sep}${dir}`);
    return chokidar.watch(dirs, {
        ignoreInitial: true,
        cwd: cwd,
        ignored: /(^|[\/\\])\../,
    })
}

export const watch = (watchInstance: FSWatcher) => {
    watchInstance.on('all', async (event, filename) => {
        const file = filename.split(path.sep)
        const s_filename = file[file.length - 1].split('.')
        const fileExt = s_filename[s_filename.length - 1]
        const export_path = file.slice(0, -1).filter(name => name !== DEFAULT_BANNERS_DIR).join(path.sep)

        if(typeof fileExt !== 'string') return
        
        if(REACT_EXT.includes(fileExt)){
            await compileReact({entryPoints: [filename], path: export_path})
        }
    })
}