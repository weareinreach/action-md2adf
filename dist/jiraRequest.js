var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { readFileSync } from 'fs';
import { parse } from 'yaml';
import axios from 'axios';
// const cliConfigPath = `${process.env.HOME}/.jira.d/config.yml`
const configPath = `${process.env.HOME}/jira/config.yml`;
const config = parse(readFileSync(configPath, 'utf8'));
const { baseUrl, token, email } = config;
export const createJiraIssue = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const issue = yield axios.post(`${baseUrl}/rest/api/3/issue`, body, {
        auth: {
            username: email,
            password: token,
        },
    });
    return issue;
});
