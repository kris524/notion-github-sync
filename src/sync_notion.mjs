import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config()
// require('dotenv').config();


const notion = new Client({auth: process.env.NOTION_API})

async function get_connected_pages(){
    const pages = await notion.search({})

    return pages["results"]
}

const pages = await get_connected_pages()

// console.log(pages)




async function build_issue_data(pages) {

    var list_of_issues = []

    pages.forEach( async (dict) =>{

        var issue = {}
        
        // condition to get only pages part of the database, excluding the template page built-in the database 
        if (dict.parent.type === "database_id" && dict.properties["Type"].select !== null) 
        {
            
        issue["title"] = dict.properties["Name"].title[0].plain_text
        issue["labels"] = dict.properties["Type"].select.name

        const paragraphs = await get_paragraphs(dict["id"])
        //    console.log(paragraphs)
        issue["body"] = paragraphs
        // console.log(issue)
        list_of_issues.push(issue)

            }

        }) 
    
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

// const paragraphs = await get_paragraphs("fde64ac0-06e2-4b3a-9db6-126d75049c4d")
// console.log(paragraphs)


// async function get_connected_database(){
//     const pages = await notion.search({})

//     const notion_database = pages["results"].filter(dict => dict["object"] === "database")
//     return notion_database[0]

// }

// We want the data only from pages that have the database_id


// const ndb = await get_connected_database()

// console.log(ndb)

// Object.entries(ndb.properties).forEach( ([property_name, property_value]) => {

//     console.log(property_name)
//     console.log(property_value)

// })



// async function get_db_properties()


