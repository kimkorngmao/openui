import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <meta name="description" content="Ship production-ready components with beautiful design. Copy & paste components tailored for modern web apps. Fully responsive, accessible, and dark mode ready."/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <title>OpenUI</title>
        <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
      </Head>
      <body className="antialiased bg-gray-50 dark:bg-gray-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
