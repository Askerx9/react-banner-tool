import postcss from 'postcss'
import { plugins } from '../utils/posstcss.config';
type Options = {
    from: undefined,
    to: string
}
export const compileCss = async (css: string, options : Options) => {    
    const result = await postcss(plugins).process(css, options)

    return result
}