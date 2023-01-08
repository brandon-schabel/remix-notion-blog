import type { SerializeFrom } from "@remix-run/node";
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
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import Navbar from "./components/navbar";

import styles from "./styles/app.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader() {
  return {
    ENV: {
      LOGO_URL: process.env.BLOG_MAIN_IMAGE,
      BLOG_TITLE: process.env.BLOG_TITLE,
      VERCEL_ANALYTICS_ID: process.env.VERCEL_ANALYTICS_ID,
    },
  };
}

declare global {
  interface Window {
    ENV: SerializeFrom<typeof loader>["ENV"];
  }
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>();
  useEffect(() => {
    inject();
  }, []);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar logoUrl={ENV.LOGO_URL} navTitle={ENV.BLOG_TITLE} />
        <Outlet />
        <Analytics />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </body>
    </html>
  );
}
