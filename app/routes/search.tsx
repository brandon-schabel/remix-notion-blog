import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { notionSearch } from "~/utils/notion.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const searchText = formData.get("searchText");

  const searchResult = await notionSearch(searchText as string);

  return json({ searchResult }, { status: 200 });
}

export default function () {
  const action = useActionData();

  return (
    <div>
      <div>Action Data</div>
      <pre>{JSON.stringify(action, null, 2)}</pre>
      <Form method="post">
        <input type="text" name="searchText" />
        <button type="submit">Search</button>
      </Form>
    </div>
  );
}
