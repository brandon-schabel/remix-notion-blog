import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { inject } from "@vercel/analytics";
import Navbar from "./components/navbar";

import styles from "./styles/app.css";

inject();

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  return {
    logoUrl: process.env.BLOG_MAIN_IMAGE,
    blogTitle: process.env.BLOG_TITLE,
  };
}

export default function App() {
  const { logoUrl, blogTitle } = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar logoUrl={logoUrl} navTitle={blogTitle} />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
