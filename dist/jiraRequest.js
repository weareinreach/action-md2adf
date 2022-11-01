import { readFileSync } from 'fs';
import { parse } from 'yaml';
import axios from 'axios';
// const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`;
const config = parse(readFileSync(configPath, 'utf8'));
const { baseUrl, token, email } = config;
export const createJiraIssue = async (body) => {
    const issue = await axios.post(`${baseUrl}/rest/api/3/issue`, body, {
        auth: {
            username: email,
            password: token,
        },
    });
    return issue;
};
