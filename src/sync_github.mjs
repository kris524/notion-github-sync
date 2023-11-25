import { Octokit } from "octokit";
import dotenv from 'dotenv';
dotenv.config()


const octokit = new Octokit({auth: process.env.GITHUB_KEY})


async function get_github_issues(){
    
    const resp = await octokit.request("GET /repos/{owner}/{repo}/issues", {
        "owner": "kris524",
        "repo": "test_repo_sync"
    })
    
    console.log(resp.data)

}

get_github_issues()

async function create_github_issue(list_of_issues) {

    for (const issue of list_of_issues ) {
        //Actually, we will take the id from notion and save it against the id in GitHub, the same we did before 
        // Use redis again 


        await octokit.request('POST /repos/{owner}/{repo}/issues', {
            owner: 'kris524',
            repo: 'test_repo_sync',
            title: issue["title"],
            body: issue["body"],
            labels: [
                issue["labels"]
            ],
        })
    }
}

const dummy_issue = [
    {
      title: 'Firefox strange crash issue',
      labels: 'bug',
      body: 'What were you trExplain was the expected outcome of your action.'
    },
]


// create_github_issue(dummy_issue)