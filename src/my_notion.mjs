import { NotionAPI } from "notion-client";
import { Octokit } from "octokit";
import dotenv from 'dotenv';
dotenv.config()
// require('dotenv').config();
const notion_key = process.env.NOTION_API

const octokit = new Octokit({auth: process.env.GITHUB_KEY})


async function get_github_issues(){
    
    const resp = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        "owner": "kris524",
        "repo": "Cpp_sandbox"
    })

}



console.log(resp.data)

const notion = new NotionAPI()

