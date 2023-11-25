import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config()


const notion = new Client({auth: process.env.NOTION_API})

async function get_connected_pages(){
    const pages = await notion.search({})

    return pages["results"]
}

const pages = await get_connected_pages()

async function build_issue_data(pages) {

    var list_of_issues = []

    for (const dict of pages){

        var issue = {}
        
        // condition to get only pages part of the database, excluding the template page built-in the database 
        if (dict.parent.type === "database_id" && dict.properties["Type"].select !== null) 
        {
            
        issue["title"] = dict.properties["Name"].title[0].plain_text

        if (dict.properties["Type"].select.name == "Issue"){

            issue["labels"] = "bug"
        }
        else{
            issue["labels"] = "enhancement"
        }

        const paragraphs = await get_paragraphs(dict["id"])
        issue["body"] = paragraphs

        issue["notion_id"] = dict["id"]
        list_of_issues.push(issue)

        // console.log(dict)

        }

    }
    
        return list_of_issues;

}

const list_of_issues = await build_issue_data(pages);

console.log(list_of_issues);

async function get_paragraphs(blockId) {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });

  var paragraphs = ""

  const res = response["results"]

  res.forEach( (dict) => {
    
    if (dict["type"] == "paragraph"){
        // console.log(dict.paragraph.rich_text) 
        const data = dict.paragraph.rich_text
        const plainText = data.map(item => item.plain_text)
        
        paragraphs += plainText
        } 
    }
    )
    return paragraphs;
};





