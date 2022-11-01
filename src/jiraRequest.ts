import { readFileSync } from 'fs'
import { parse } from 'yaml'
import fetch from 'node-fetch'

// const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`

const config = parse(readFileSync(configPath, 'utf8'))

const { baseUrl, token, email } = config

const authString = Buffer.from(`${email}:${token}`).toString('base64')

export const createJiraIssue = async (body: JiraCreateIssue) => {
	const issue = await fetch(`${baseUrl}/rest/api/3/issue`, {
		method: 'post',
		body: JSON.stringify(body),
		headers: {
			Authorization: `Basic ${authString}`,
		},
		// auth: {
		// 	username: email,
		// 	password: token,
		// },
	})
	return issue
}

export type JiraCreateIssue = {
	fields: {
		issuetype: {
			name: string
		}
		project: {
			key: string
		}
		summary: string
		description: string | Record<string, any>
	}
}
