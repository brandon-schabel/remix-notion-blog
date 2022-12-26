import { Link, useLoaderData } from "@remix-run/react";
import { PageImage } from "~/components/page-image";
import { tenMinutes, week } from "~/constants/caching-times";
import { retrieveNotionDatabase } from "~/utils/notion.server";
import {
  getPageSubTitle,
  getPageTitle,
  getPostCreatedAt
} from "~/utils/render-utils";

export function headers() {
  return {
    "Cache-Control": `public, max-age=${tenMinutes}, s-maxage=${tenMinutes} stale-while-revalidate=${week}`,
  };
}

// in the loader retrieve all the posts rom the notion database
// notice here we have a .env variable for the notion database id
export async function loader() {
  const pages = await retrieveNotionDatabase(process.env.NOTION_DATABASE || "");
  return { pages };
}

export default function Index() {
  // on the client side we can use the useLoaderData hook to get the data
  // returned from the loader
  const { pages } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col justify-center items-center w-full my-4 space-y-4">
      {pages.results.map((page: any) => {
        // here we iterate over the pages and render a link to each page
        // along with the title, subtitle, and created date
        return (
          <div key={page.id}>
            <Link to={`/post/${page.id}`}>
              {/* we use a component to grab the pages image */}
              <div className="flex justify-center items-center w-full">
                <PageImage page={page} />
              </div>

              <div className="font-bold text-xl text-center max-w-md py-2">
                {/* return Text component that grabs the pages title  */}
                {getPageTitle(page)}
              </div>

              <div className="text-center">
                <div>{getPageSubTitle(page)}</div>
              </div>

              <div className="flex justify-center opacity-50">
                {getPostCreatedAt(page).toDateString()}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
