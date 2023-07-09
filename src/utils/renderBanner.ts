import fse from 'fs-extra';
import {glob} from 'glob';
import {renderToStaticMarkup} from 'react-dom/server';
import { compileCss } from '../tasks/css';

export const reactToHtml = async (dir: string) => {
    const jsFile = `${dir}/index.js`;
    const banner = await glob(jsFile, { ignore: 'node_modules/**', absolute: true });

    for (const file of banner) {
        const component = await import(file);
        const html = `<!DOCTYPE html>${renderToStaticMarkup(component.default())}`;
        fse.writeFile(`${dir}/index.html`, html, (err) => {
            if (err) throw err;
            fse.removeSync(jsFile);
        });
    }
}

export const renderCss = async (dir: string) => {
    const cssFile = `${dir}/index.css`;
    const css = await fse.readFileSync(cssFile, 'utf8');
    const compiledCss = await compileCss(css, {from: undefined, to: `${dir}/styles.css`})

    fse.writeFile(`${dir}/styles.css`, compiledCss.css, (err) => {
        if (err) throw err;
        fse.removeSync(cssFile);
    });
}


