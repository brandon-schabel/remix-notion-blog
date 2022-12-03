import { Client } from "@notionhq/client";
export const notion = new Client({ auth: process?.env?.NOTION_API_KEY });

export const retrieveNotionDatabase = async (databaseId: string) => {
  const response = await notion.databases.query({
    database_id: databaseId,
    // sort by the most recently created posts
    sorts: [{ property: "Created", direction: "ascending" }],
    // filter out any posts that are not published
    filter: { property: "Public", checkbox: { equals: true } },
  });

  return response;
};

export const retrieveNotionPage = async (pageId: string) => {
  const response = await notion.pages.retrieve({ page_id: pageId });

  return response;
};

export const retrieveNotionBlock = (blockId: string) => {
  const response = notion.blocks.children.list({
    block_id: blockId,
  });
  return response;
};

export const notionSearch = async (query: string) => {
  const response = await notion.search({
    query: query,
    sort: {
      direction: "ascending",
      timestamp: "last_edited_time",
    },
  });
  return response;
};
