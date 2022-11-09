import showdown from 'showdown'
import init, { convert } from './htmltoadf/htmltoadf.js'

const sdConvert = new showdown.Converter()
sdConvert.setFlavor('github')
sdConvert.setOption('ghMentionsLink', true)

export async function gfm2adf(markdown: string) {
	try {
		const html = sdConvert.makeHtml(markdown)
		const adf = await init()
			.then(() => {
				return convert(html)
			})
			.catch((err) => {
				throw err
			})
		// 	.then((x) => x)
		// html2adf(html).then((x) => {
		// 	adf = x
		// })
		return await JSON.parse(adf)
	} catch (err) {
		console.error(err)
	}
}
