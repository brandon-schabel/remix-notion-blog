import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
}

export async function loader({ request }: LoaderArgs) {}

export default function () {
  const loaderData = useLoaderData<typeof loader>();
  return <div></div>;
}
