import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import classNames from "classnames";
import { notionSearch, retrieveNotionDatabase } from "~/notion.server";
import { Text } from "~/utils/renderBlock";
import prismCss from "../styles/prism.css";

const tenMinutes = 10 * 60;
const week = 7 * 24 * 60 * 60;

export function headers() {
  return {
    // - browser cache for 10 minutes
    // - CDN for 1 second (can purge if needed)
    // - stale-while-revalidate for 600
    // - cache is only fresh for a second, and then cache is regenerated on next request
    // - serve cache when rebuilding for always fast responses
    "Cache-Control": `public, max-age=${tenMinutes}, s-maxage=600 stale-while-revalidate=${week}`,
  };
}

export function links() {
  return [{ rel: "stylesheet", href: prismCss }];
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const searchText = formData.get("searchText");

  const searchResult = await notionSearch(searchText as string);

  return json({ searchResult }, { status: 200 });
}

export const getPageMainImageUrl = (page: any) => {
  return page?.properties["Post Image"]?.files[0]?.file?.url;
};

export const getPageTitle = (page: any) => {
  return <Text text={page.properties.Name.title} />;
};

export const getPageSubTitle = (page: any) => {
  const subtitleProperties = page.properties["Sub Title"].rich_text;
  console.log(subtitleProperties);

  return <Text text={subtitleProperties} />;
};

export const getPostCreatedAt = (page: any) => {
  const createdAtProperties = page.properties["Created"].created_time;
  console.log(createdAtProperties);

  return new Date(createdAtProperties);
};

export const PageImage = ({
  page,
  size = "md",
}: {
  page: any;
  size?: "sm" | "md" | "lg";
}) => {
  const pageImageUrl = getPageMainImageUrl(page);

  if (!pageImageUrl) {
    return null;
  }

  return (
    <img
      src={pageImageUrl}
      width="auto"
      className={classNames("rounded-lg shadow-md w-fit", {
        "h-32": size === "sxm",
        "h-64": size === "md",
        "h-96": size === "lg",
      })}
    />
  );
};

export async function loader({}: LoaderArgs) {
  const page = await retrieveNotionDatabase(process.env.NOTION_DATABASE || "");
  return { page };
}

export default function Index() {
  const loader = useLoaderData();
  const action = useActionData();

  console.log(loader.page.results);
  return (
    <div className="flex flex-col justify-center items-center w-full">
      {/* <div>Loader Data</div>
      <pre>{JSON.stringify(loader, null, 2)}</pre> */}

      {loader.page.results.map((page: any) => {
        return (
          <div>
            <Link to={`/posts/${page.id}`}>
              <div className="shadow-md">
                <PageImage page={page} />
              </div>

              <div className="font-bold text-lg text-center">
                {getPageTitle(page)}
              </div>

              <div className="text-center">
                <div>{getPageSubTitle(page)}</div>
              </div>

              <div>{getPostCreatedAt(page).toDateString()}</div>
            </Link>
          </div>
        );
      })}
      {/* <div>Action Data</div> */}
      {/* <pre>{JSON.stringify(action, null, 2)}</pre> */}
      {/* <Form method="post">
        <input type="text" name="searchText" />
        <button type="submit">Search</button>
      </Form> */}
    </div>
  );
}
