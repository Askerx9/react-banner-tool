import chokidar, {FSWatcher} from 'chokidar'
import path from 'path'

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
        console.log(`Watching ${dir}, ${filename}, filename: ${file[file.length - 1]}`)
    })
}