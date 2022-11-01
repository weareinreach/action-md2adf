import showdown from 'showdown'
import init, { convert } from './htmltoadf/htmltoadf.js'

showdown.setFlavor('github')
const sdConvert = new showdown.Converter()

// const htmltoadf = ffiNapi.Library('./dist/libhtmltoadf', {
// 	convert: ['string', ['string']],
// })

const html2adf = async (html: string) => {
	return await Promise.resolve(init().then(() => convert(html)))
}
export async function gfm2adf(markdown: string) {
	const html = sdConvert.makeHtml(markdown)
	console.log(html)
	const adf = init().then(() => {
		return convert(html)
	})
	// 	.then((x) => x)
	// html2adf(html).then((x) => {
	// 	adf = x
	// })
	return await adf
}
