import {
	getInput,
	info as logInfo,
	error as logError,
	setFailed,
} from '@actions/core'
import { context } from '@actions/github'
import { gfm2adf } from './convert'
import { createJiraIssue, type JiraCreateIssue } from './jiraRequest'

type GithubContext = typeof context

const issueCreator = async (payload: GithubContext['payload']) => {
	try {
		const project = getInput('project')
		const issuetype = getInput('issuetype')
		const summary = getInput('summary') || payload.issue.title
		const fields = getInput('fields') || {}

		if (!project || !issuetype) {
			throw 'project & issuetype required!'
		}

		const jiraBody = `${payload.issue.html_url as string}\n\n${
			payload.issue.body as string
		}`
		const adf = await gfm2adf(jiraBody)
		const issuePayload: JiraCreateIssue = {
			fields: {
				issuetype: {
					name: issuetype,
				},
				project: {
					key: project,
				},
				summary,
				description: adf,
				...fields,
			},
		}

		const newIssue = await createJiraIssue(issuePayload)
		if (newIssue.status === 201) {
			logInfo(JSON.stringify(newIssue.json, null, 2))
		} else throw { status: newIssue.status, text: newIssue.statusText }
	} catch (err) {
		console.error(err)
	}
}

try {
	const payload = context.payload

	issueCreator(payload)
} catch (error) {
	if (error instanceof Error) {
		logError(error.message)
		setFailed(error.message)
	} else {
		logError(error as string)
		setFailed(error as string)
	}
}
