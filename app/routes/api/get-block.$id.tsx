import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { retrieveNotionBlock } from "~/notion.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
}

export async function loader({ request, params }: LoaderArgs) {
  const blockData = await retrieveNotionBlock(params.id || "");

  return { blockData };
}
