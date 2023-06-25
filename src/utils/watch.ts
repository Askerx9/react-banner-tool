import chokidar, {FSWatcher} from 'chokidar'
import path from 'path'
import { compileJS } from '../tasks/javascript'
import { REACT_EXT } from '../constants'
import { DEFAULT_BANNER_DIR } from '../constants'

export const watchInstance = (dir: string) => {
    return chokidar.watch(dir, {
        ignoreInitial: true,
        cwd: dir.split(path.sep).slice(0, -1).join(path.sep),
        ignored: /(^|[\/\\])\../,
    })
}

export const watch = (watchInstance: FSWatcher, dir: string) => {
    watchInstance.on('all', async (event, filename) => {
        const file = filename.split(path.sep)
        const s_filename = file[file.length - 1].split('.')
        const fileExt = s_filename[s_filename.length - 1]
        const export_path = file.slice(0, -1).filter(name => name !== DEFAULT_BANNER_DIR).join(path.sep)

        if(typeof fileExt !== 'string') return
        
        if(REACT_EXT.includes(fileExt)){
            await compileJS({entryPoints: [filename], path: export_path})
        }
    })
}