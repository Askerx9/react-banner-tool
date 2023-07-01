import {glob} from 'glob';

const reactToHtml = async (dir: string) => {

    const banner = await glob(dir + '/*.js', { ignore: 'node_modules/**', absolute: true });
    console.log(banner);

    for (const file of banner) {
        console.log(file);
        const component = await import(file);
        console.log(component);
    }

    // const html = renderToString(component);
    // return html;
}
export default reactToHtml;


