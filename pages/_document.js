import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="A dummy e-commerce application for accesories like hats, gloves, backpacks. Built with Next.js"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Open+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
