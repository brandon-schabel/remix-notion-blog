import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment } from "react";
import { PageImage } from "~/components/page-image";
import { Text } from "~/components/text";
import { tenMinutes, week } from "~/constants/caching-times";
import prismCss from "~/styles/prism.css";
import { retrieveNotionBlock, retrieveNotionPage } from "~/utils/notion.server";
import { renderBlock } from "~/utils/render-block";

export function links() {
  return [{ rel: "stylesheet", href: prismCss }];
}

export function headers() {
  return {
    "Cache-Control": `public, max-age=${tenMinutes}, s-maxage=600 stale-while-revalidate=${week}`,
  };
}

export const meta: MetaFunction = ({ data }) => {
  return {
    charset: "utf-8",
    title: data?.page?.properties?.Name?.title[0]?.plain_text || "Blog Article",
    viewport: "width=device-width,initial-scale=1",
  };
};

export async function loader({ params }: LoaderArgs) {
  const page = await retrieveNotionPage(params.id || "");

  let blocks: any[] = [];

  try {
    const blocksResult = await retrieveNotionBlock(page.id);

    blocks = blocksResult.results;

    let currentCursor = blocksResult?.next_cursor || null;
    let hasMore = blocksResult.has_more;

    // continue fetching until blocks.has_more is false,
    // i tried increasing page size, but that didn't work
    while (hasMore) {
      const additionalBlocks = await retrieveNotionBlock(
        page.id,
        currentCursor
      );

      blocks = [...blocks, ...additionalBlocks.results];

      currentCursor = additionalBlocks?.next_cursor || null;
      hasMore = additionalBlocks.has_more;
    }
  } catch (e) {
    console.error(e);
  }

  return { page, blocks };
}

export default function () {
  const { page, blocks } = useLoaderData<typeof loader>();

  return (
    <div className="w-full flex justify-center">
      <div className="max-w-full w-[900px]">
        <div className="px-6 md:px-24">
          <div className="flex flex-col justify-center items-center font-bold text-4xl">
            <h1>
              {/* render the page title */}
              <Text text={page?.properties?.Name.title} />
            </h1>
            {/* page image component */}
            <div className="flex items-center pt-4 pb-2">
              <PageImage page={page} size="lg" />
            </div>
          </div>
          <section>
            {/* iterate through all blocks and render out all the data */}
            {blocks.map((block) => (
              <Fragment key={block.id}>{renderBlock(block)}</Fragment>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
