import * as esbuild from 'esbuild'
import { DEFAULT_OUTPUT_DIR } from '../constants'
import { reactToHtml, renderCss } from '../utils/renderBanner';
import { runTask } from '../utils/taskRunner';

type compileJSProps = {
    entryPoints: string[],
    path: string,
}

export const compileReact = async ({entryPoints, path}: compileJSProps) => {    
    runTask(`jsx: ${path}`, async () => {
        const outdir = `${DEFAULT_OUTPUT_DIR}/${path}`;
        await esbuild.build({
            entryPoints: entryPoints,
            platform: 'node',
            write: true,
            bundle: true,
            outdir: outdir,
            }).catch((e) => console.error(e.message));

            await reactToHtml(outdir);
            await renderCss(outdir)
    });
};