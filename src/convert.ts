import showdown from 'showdown'
import ffiNapi from 'ffi-napi'

showdown.setFlavor('github')
const sdConvert = new showdown.Converter()

const htmltoadf = ffiNapi.Library('./dist/libhtmltoadf', {
	convert: ['string', ['string']],
})

export const gfm2adf = (markdown: string) => {
	const html = sdConvert.makeHtml(markdown)
	const adf = htmltoadf.convert(html)
	return JSON.parse(adf)
}

console.log(gfm2adf('**test**'))
