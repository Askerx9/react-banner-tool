import * as esbuild from 'esbuild'
import { DEFAULT_OUTPUT_DIR } from '../constants'
  // @ts-ignore
import postCssPlugin from '@deanc/esbuild-plugin-postcss'

type compileJSProps = {
    entryPoints: string[],
    path: string,
}

export const compileJS = async ({entryPoints, path}: compileJSProps) => {
    console.log(`Compiling JS: ${entryPoints}`);
        await esbuild.build({
            entryPoints: entryPoints,
            bundle: true,
            outdir: `${DEFAULT_OUTPUT_DIR}/${path}`,
            plugins: [
                postCssPlugin(),
            ],
        }).catch((e) => console.error(e.message));
        console.log(`Compiled JS: ${entryPoints}`);
};