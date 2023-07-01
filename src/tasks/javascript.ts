import * as esbuild from 'esbuild'
import { DEFAULT_OUTPUT_DIR } from '../constants'
  // @ts-ignore
import postCssPlugin from '@deanc/esbuild-plugin-postcss'
import reactToHtml from '../utils/reactToHtml';

type compileJSProps = {
    entryPoints: string[],
    path: string,
}

export const compileJS = async ({entryPoints, path}: compileJSProps) => {
    console.log(`Compiling JS: ${entryPoints}`);
        const outdir = `${DEFAULT_OUTPUT_DIR}/${path}`;
        await esbuild.build({
            entryPoints: entryPoints,
            platform: 'node',
            write: true,
            bundle: true,
            outdir: outdir,
            plugins: [
                postCssPlugin({
                    stage: 1,
                    browsers: 'last 2 versions',
                    plugins: [
                      require('postcss-preset-env'),
                      require('postcss-combine-media-query')
                    ]
                  }),
            ],
        }).catch((e) => console.error(e.message));

        reactToHtml(outdir);
      console.log(`Compiled JS: ${entryPoints}`);
};