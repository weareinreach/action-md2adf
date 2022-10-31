import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer'
import {
	setOutput,
	info as logInfo,
	error as logError,
	setFailed,
} from '@actions/core'
import { context } from '@actions/github'
import type { IssuesOpenedEvent } from '@octokit/webhooks-definitions/schema'
const transformer = new MarkdownTransformer()

const md2adf = (markdown: string) => {
	return transformer.parse(markdown)
}

try {
	const payload = context.payload as IssuesOpenedEvent
	const jiraBody = `${payload.issue.html_url}\n\n${payload.issue.body}`
	const adf = md2adf(jiraBody)

	setOutput('adf', adf)
	logInfo('Issue body converted')
} catch (error) {
	if (error instanceof Error) {
		logError(error.message)
		setFailed(error.message)
	} else {
		logError(error as string)
		setFailed(error as string)
	}
}
