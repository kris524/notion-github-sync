import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config()
// require('dotenv').config();


const notion = new Client({auth: process.env.NOTION_API})

async function get_connected_pages(){
    const pages = await notion.search({})

    // console.log("Users Notion:", pages["results"])
    return pages["results"]
}

const pages = await get_connected_pages()

// console.log(pages)

var list_of_issues = []

pages.forEach( (dict) =>{

    var issue = {}
    
    // condition to get only pages part of the database, excluding the template page built-in the database 
    if (dict.parent.type === "database_id" && dict.properties["Type"].select !== null) 
    {
        
       issue["title"] = dict.properties["Name"].title[0].plain_text
       issue["labels"] = dict.properties["Type"].select.name
       var page_id = dict["id"]
    //    issue["body"]
       
       list_of_issues.push(issue)
    }

}) 

console.log(list_of_issues);

// NEXT STEPS
// Do not delete the template in Notion
// For each page (excluding the template) get the title, label and text
// to get the text, we need to use the id to get the blocks in the page, and get the text from those blocks



async function get_paragraphs(blockId) {
//"fde64ac0-06e2-4b3a-9db6-126d75049c4d";
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });

//   console.log(response["results"]);
  return response["results"]
};

const res = await get_paragraphs("fde64ac0-06e2-4b3a-9db6-126d75049c4d")

var paragraphs = ""
res.forEach( (dict) => {
    if (dict["type"] == "paragraph"){
        console.log(dict["paragraph"]["rich_text"])
    } 
}



)


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


