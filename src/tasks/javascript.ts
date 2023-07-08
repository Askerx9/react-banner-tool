import * as esbuild from 'esbuild'
import { DEFAULT_OUTPUT_DIR } from '../constants'
import reactToHtml from '../utils/reactToHtml';
import { runTask } from '../utils/taskRunner';

type compileJSProps = {
    entryPoints: string[],
    path: string,
}

export const compileJS = async ({entryPoints, path}: compileJSProps) => {    
    runTask(`Compiling banner at: ${path}`, async () => {
        const outdir = `${DEFAULT_OUTPUT_DIR}/${path}`;
        await esbuild.build({
            entryPoints: entryPoints,
            platform: 'node',
            write: true,
            bundle: true,
            outdir: outdir,
            plugins: [],
            }).catch((e) => console.error(e.message));

            await reactToHtml(outdir);
    });
};