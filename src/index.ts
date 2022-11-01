// import { MarkdownTransformer } from '@atlaskit/editor-markdown-transformer'
import fnTranslate from 'md-to-adf'
import {
	setOutput,
	info as logInfo,
	error as logError,
	setFailed,
} from '@actions/core'
import { context } from '@actions/github'
import type { IssuesOpenedEvent } from '@octokit/webhooks-definitions/schema'
// const transformer = new MarkdownTransformer()

export const md2adf = (markdown: string) => {
	return fnTranslate(markdown)
}

try {
	const payload = context.payload // as IssuesOpenedEvent
	const jiraBody = `${payload.issue.html_url as string}\n\n${
		payload.issue.body as string
	}`
	const adf = md2adf(jiraBody)

	setOutput('adf', JSON.stringify(adf))
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
