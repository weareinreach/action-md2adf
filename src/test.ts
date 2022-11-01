import showdown from 'showdown'
import ffiNapi from 'ffi-napi'

showdown.setFlavor('github')
const sdConvert = new showdown.Converter()

const htmltoadf = ffiNapi.Library('htmltoadf/target/release/libhtmltoadf', {
	convert: ['string', ['string']],
})

const md = `# Support Question

text text

**bold text**

### h3

<img src="https://media0.giphy.com/media/gw3IWyGkC0rsazTi/giphy.gif"/>

<!--Asana:1203273835858484-->

***

#### Asana Ticket

> [Asana-1203273835858484](https://app.asana.com/0/0/1203273835858484)
<!--/Asana-->`

// console.log(md2adf(md))
const html = sdConvert.makeHtml(md)

console.log(htmltoadf.convert(html))
