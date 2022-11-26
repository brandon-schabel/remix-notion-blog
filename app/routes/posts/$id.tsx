import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { retrieveNotionBlock, retrieveNotionPage } from "~/notion.server";
import { renderBlock, Text } from "~/utils/renderBlock";
import { PageImage } from "..";

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

export const meta: MetaFunction = ({ data }) => {

  return {
    charset: "utf-8",
    title: data?.page?.properties?.Name?.title[0]?.plain_text ||"Blog Article",
    viewport: "width=device-width,initial-scale=1",
  };
};

export async function loader({ request, params }: LoaderArgs) {
  const page = await retrieveNotionPage(params.id || "");

  let blocks = [];

  try {
    const blocksResult = await retrieveNotionBlock(page.id);

    blocks = blocksResult.results;
  } catch (e) {
    console.error(e);
  }

  return { page, blocks };
}

export default function () {
  const { page, blocks } = useLoaderData<typeof loader>();


  return (
    <div className="w-full flex justify-center">
      <div className="lg:max-w-5xl">
        <div className="flex flex-col justify-center items-center font-bold text-4xl">
          <h1>
            <Text text={page.properties.Name.title} />
          </h1>
          <PageImage page={page} />
        </div>
        <section>
          {blocks.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))}
        </section>
      </div>
    </div>
  );
}
