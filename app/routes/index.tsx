import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { notionSearch, retrieveNotionDatabase } from "~/notion.server";

export async function loader({}: LoaderArgs) {
  const page = await retrieveNotionDatabase("7ad7174312014a559e376d7754739181");
  return { page };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const searchText = formData.get("searchText");

  const searchResult = await notionSearch(searchText as string);

  return json({ searchResult }, { status: 200 });
}

export default function Index() {
  const loader = useLoaderData();
  const action = useActionData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {/* <div>Loader Data</div>
      <pre>{JSON.stringify(loader, null, 2)}</pre> */}
      Pages:
      {loader.page.results.map((page: any) => {
        return (
          <Link to={`/posts/${page.id}`}>
            {page.properties.Name.title[0].text.content}
          </Link>
        );
      })}
      <div>Action Data</div>
      {/* <pre>{JSON.stringify(action, null, 2)}</pre> */}
      <Form method="post">
        <input type="text" name="searchText" />
        <button type="submit">Search</button>
      </Form>
    </div>
  );
}
