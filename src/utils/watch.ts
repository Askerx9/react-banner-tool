import chokidar, {FSWatcher} from 'chokidar'
import path from 'path'
import * as esbuild from 'esbuild'
import { DEFAULT_OUTPUT_DIR } from '../constants'

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
        const fileExt = file[file.length - 1].split('.')
        console.log(`Watching ${dir}, ${filename}, filename: ${file[file.length - 1]}, fileExt: ${fileExt[fileExt.length - 1]}`)

        if(['tsx', 'ts', 'js', 'jsx'].includes(fileExt[fileExt.length - 1])){
            await esbuild.build({
                entryPoints: [filename],
                bundle: true,
                outdir: DEFAULT_OUTPUT_DIR
            })
        }
    })
}