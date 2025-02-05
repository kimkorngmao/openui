import { ThemeProvider } from "@/context/ThemeContext";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="Ship production-ready components with beautiful design. Copy & paste components tailored for modern web apps. Fully responsive, accessible, and dark mode ready."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="author" content="KimKorng Mao"></meta>
        <meta name="keywords" content="OpenUI, UI, Components, React, TailwindCSS, Design, Development, Web, Apps"></meta>
        <meta name="robots" content="index, follow"></meta>
        <meta name="googlebot" content="index, follow"></meta>
        <meta name="google" content="notranslate"></meta>
        <meta name="generator" content="Next.js"></meta>
        <meta name="application-name" content="OpenUI"></meta>
        <meta name="msapplication-TileColor" content="#111827"></meta>
        <meta name="theme-color" content="#111827"></meta>

        <meta property="og:url" content="https://openui.kimkorngmao.com/"/>
        <meta property="og:type" content="website"/>
        <meta property="og:title" content="OpenUI"/>
        <meta property="og:description" content="Ship production-ready components with beautiful design. Copy & paste components tailored for modern web apps. Fully responsive, accessible, and dark mode ready."/>
        <meta property="og:image" content="https://images.kimkorngmao.com/media/projects/featured/openui.jpg"/>
        
        <meta name="twitter:card" content="summary_large_image"/>
        <meta property="twitter:domain" content="openui.kimkorngmao.com"/>
        <meta property="twitter:url" content="https://openui.kimkorngmao.com/"/>
        <meta name="twitter:title" content="OpenUI"/>
        <meta name="twitter:description" content="Ship production-ready components with beautiful design. Copy & paste components tailored for modern web apps. Fully responsive, accessible, and dark mode ready."/>
        <meta name="twitter:image" content="https://images.kimkorngmao.com/media/projects/featured/openui.jpg"/>

        <title>OpenUI</title>
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
