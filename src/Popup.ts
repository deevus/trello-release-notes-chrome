import * as fetch from "isomorphic-fetch";

declare const API_KEY: string;
declare const Trello: any;
const trelloWrapper = require("trello");
trelloWrapper(window, require("jquery"), {
    version: 1,
    key: API_KEY,
    apiEndpoint: "https://api.trello.com",
    authEndpoint: "https://trello.com"
});

function authenticationSuccess(...args) {
    console.log(args);
}

function authenticationFailure(...args) {
    console.log(args);
}

Trello.authorize({
  type: "popup",
  name: "Getting Started Application",
  scope: {
    read: "true",
    write: "true" },
  expiration: "never",
  success: authenticationSuccess,
  error: authenticationFailure
});

/*
const boardIdPattern = /https?:\/\/(www\.)?trello.com\/b\/([a-zA-Z0-9]+)\//;
function getBoardIdsFromTabs(tabs: chrome.tabs.Tab[]) {
    for (const tab of tabs) {
        const result = boardIdPattern.exec(tab.url);
        const [url, _, id] = result;
        const jsonUrl = `https://trello.com/b/${id}.json`;
    }
}

chrome.tabs.query({active: true}, getBoardIdsFromTabs);

*/