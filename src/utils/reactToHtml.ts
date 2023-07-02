import fse from 'fs-extra';
import {glob} from 'glob';
import {renderToString, renderToStaticMarkup} from 'react-dom/server';

const reactToHtml = async (dir: string) => {
    const jsFile = `${dir}/index.js`;
    const banner = await glob(jsFile, { ignore: 'node_modules/**', absolute: true });

    for (const file of banner) {
        const component = await import(file);
        const html = `<!DOCTYPE html>${renderToStaticMarkup(component.default())}`;
        fse.writeFile(`${dir}/index.html`, html, (err) => {
            if (err) throw err;
            fse.removeSync(jsFile);
            console.log('The file has been saved!');
        });
    }

    // const html = renderToString(component);
    // return html;
}
export default reactToHtml;


