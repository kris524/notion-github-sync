import { Client } from "@notionhq/client";
import dotenv from 'dotenv';
dotenv.config()
// require('dotenv').config();


const notion = new Client({auth: process.env.NOTION_API})

async function get_connected_pages(){
    const pages = await notion.search({})

    console.log("Users Notion:", pages["results"])
    return pages["results"]
}

// const pages = get_connected_pages()


async function get_connected_database(){
    const pages = await notion.search({})

    const notion_database = pages["results"].filter(dict => dict["object"] === "database")
    console.log(notion_database)

}


get_connected_database()

// async function get_db_properties()


