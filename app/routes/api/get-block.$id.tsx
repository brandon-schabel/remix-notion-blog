import type { LoaderArgs } from "@remix-run/node";
import { retrieveNotionBlock } from "~/utils/notion.server";

export async function loader({ request, params }: LoaderArgs) {
  const blockData = await retrieveNotionBlock(params.id || "");

  return { blockData };
}
