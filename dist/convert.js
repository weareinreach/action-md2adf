import showdown from 'showdown';
import ffiNapi from 'ffi-napi';
showdown.setFlavor('github');
const sdConvert = new showdown.Converter();
const htmltoadf = ffiNapi.Library('htmltoadf/target/release/libhtmltoadf', {
    convert: ['string', ['string']],
});
export const gfm2adf = (markdown) => {
    const html = sdConvert.makeHtml(markdown);
    const adf = htmltoadf.convert(html);
    return JSON.parse(adf);
};
