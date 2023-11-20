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

console.log(pages)

var list_of_issues = []

pages.forEach( (dict) =>{

    var issue = {}

    if (dict.parent.type === "database_id") 
    {
       console.log(dict.properties["Type"].select.name) 
        
       issue["title"] = dict.properties["Name"].title[0].plain_text
       issue["labels"] = dict.properties["Type"].select.name
    //    issue["body"]
       
       list_of_issues.push(issue)
    }

}) 

console.log(list_of_issues)



async function get_connected_database(){
    const pages = await notion.search({})

    const notion_database = pages["results"].filter(dict => dict["object"] === "database")
    return notion_database[0]

}

// We want the data only from pages that have the database_id


// const ndb = await get_connected_database()

// console.log(ndb)

// Object.entries(ndb.properties).forEach( ([property_name, property_value]) => {

//     console.log(property_name)
//     console.log(property_value)

// })



// async function get_db_properties()


