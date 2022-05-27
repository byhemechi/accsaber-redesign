import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";

import Header from "./lib/components/header";

import styles from "./tailwind.css";
import logo from "./lib/logo.png";

export async function loader() {
  return json({
    ENV: {
      NODE_ENV: process.env.NODE_ENV,
    },
  });
}

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "AccSaber",
  viewport: "width=device-width,initial-scale=1",
});

export function links() {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "shortcut icon", href: logo },
  ];
}

export default function App() {
  const data = useLoaderData();
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.process = {}; window.process.env = ${JSON.stringify(
              data.ENV
            )}`,
          }}
        />
      </head>
      <body className="dark:bg-neutral-900">
        <Header />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html className="h-full">
      <head>
        <title>Oops!</title>
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col h-full dark:bg-neutral-900">
        <Header />
        <div className="text-4xl flex items-center justify-center flex-1">
          <div className="prose prose-xl dark:prose-invert">
            {caught.status == 404 ? (
              <>
                <h1 className="text-orange-600 dark:text-orange-400">
                  404: Page not found
                </h1>
                <p>
                  Looks like you've hit a bad route. This website is a work in
                  progress, so it's likely you've simply clicked a link to
                  something that hasn't been implemented yet. (sorry!)
                </p>
              </>
            ) : (
              <p>
                <h1 className="text-red-600 dark:text-red-400">
                  Error loading page
                </h1>
                <p>It looks like something's gone wrong.</p>
                <p>
                  This website is still in development, and there's likely to be
                  a few things broken
                </p>
                <p>
                  If you've set this off with something obscure, let a dev know
                  and we'll throw it on the pile
                </p>
                <p>
                  If it's something really obvious, please don't, we probably
                  already know {":)"}
                </p>
                <h2>Full error</h2>
                <pre>{caught.data}</pre>
              </p>
            )}
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
