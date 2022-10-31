import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer'
import * as core from '@actions/core'
import * as github from '@actions/github'
import type { IssuesOpenedEvent } from '@octokit/webhooks-definitions/schema'
const transformer = new MarkdownTransformer()

const md2adf = (markdown: string) => {
	return transformer.parse(markdown)
}

try {
	const payload = github.context.payload as IssuesOpenedEvent
	const jiraBody = `${payload.issue.html_url}\n\n${payload.issue.body}`
	const adf = md2adf(jiraBody)

	core.setOutput('adf', adf)
	core.info('Issue body converted')
} catch (error) {
	if (error instanceof Error) {
		core.error(error.message)
		core.setFailed(error.message)
	} else {
		core.error(error as string)
		core.setFailed(error as string)
	}
}
