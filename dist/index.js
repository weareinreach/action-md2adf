var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
import { getInput, info as logInfo, error as logError, setFailed, } from '@actions/core';
import { context } from '@actions/github';
import { gfm2adf } from './convert';
import { createJiraIssue } from './jiraRequest';
const issueCreator = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newIssue = yield createJiraIssue(payload);
    if ((newIssue.status = 201)) {
        logInfo(newIssue.data);
    }
    else
        throw newIssue.statusText;
});
try {
    const payload = context.payload;
    const project = getInput('project');
    const issuetype = getInput('issuetype');
    const summary = (_a = getInput('summary')) !== null && _a !== void 0 ? _a : payload.issue.title;
    const fields = (_b = getInput('fields')) !== null && _b !== void 0 ? _b : {};
    if (!project || !issuetype) {
        throw 'project & issuetype required!';
    }
    const jiraBody = `${payload.issue.html_url}\n\n${payload.issue.body}`;
    const adf = gfm2adf(jiraBody);
    const issuePayload = {
        fields: Object.assign({ issuetype: {
                name: issuetype,
            }, project: {
                key: project,
            }, summary, description: adf }, fields),
    };
    issueCreator(issuePayload);
}
catch (error) {
    if (error instanceof Error) {
        logError(error.message);
        setFailed(error.message);
    }
    else {
        logError(error);
        setFailed(error);
    }
}
