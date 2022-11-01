import showdown from 'showdown'
import init, { convert } from './htmltoadf/htmltoadf.js'

showdown.setFlavor('github')
const sdConvert = new showdown.Converter()

export async function gfm2adf(markdown: string) {
	try {
		const html = sdConvert.makeHtml(markdown)
		const adf = await init().then(() => {
			return convert(html)
		})
		// 	.then((x) => x)
		// html2adf(html).then((x) => {
		// 	adf = x
		// })
		return await adf
	} catch (err) {
		console.error(err)
	}
}
