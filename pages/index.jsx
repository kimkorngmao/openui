import GridLayout from "@/components/GridLayout";
import { Header } from "@/components/Header";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { category } = context.query;
  const baseDir = path.join(process.cwd(), "public", "components");
  const fileMapPath = path.join(baseDir, "fileMaps.json"); // Adjust path if necessary

  let htmlFiles = [];
  let categories = [];
  let fileMap = {};

  // Read file map JSON if it exists
  if (fs.existsSync(fileMapPath)) {
    fileMap = JSON.parse(fs.readFileSync(fileMapPath, "utf-8"));
  }

  if (fs.existsSync(baseDir)) {
    categories = fs
      .readdirSync(baseDir)
      .filter((item) => fs.statSync(path.join(baseDir, item)).isDirectory());
  }

  const processFiles = (folder, folderPath) => {
    return fs
      .readdirSync(folderPath)
      .filter((file) => file.endsWith(".html"))
      .map((file) => {
        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, "utf-8");
        const fileKey = `${folder}\\${file}`;

        return {
          fileName: file,
          content,
          category: folder,
          createdAt: fileMap[fileKey]?.createdAt || "1970-01-01T00:00:00Z", // Default to oldest
          isPinned: fileMap[fileKey]?.isPinned || false,
        };
      });
  };

  if (category) {
    const categoryDir = path.join(baseDir, `openui-${category}`);
    if (fs.existsSync(categoryDir)) {
      htmlFiles = processFiles(`openui-${category}`, categoryDir);
    }
  } else {
    categories.forEach((folder) => {
      const folderPath = path.join(baseDir, folder);
      htmlFiles.push(...processFiles(folder, folderPath));
    });
  }

  // Sort by isPinned first, then by createdAt (newest first)
  htmlFiles.sort((a, b) => {
    if (a.isPinned === b.isPinned) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }
    return b.isPinned - a.isPinned;
  });

  return {
    props: {
      filesContent: htmlFiles,
      categories,
    },
  };
}

export default function Home({ filesContent, categories }) {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const { category } = router.query;

  const handleCopy = (content) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <main className="max-w-6xl mx-auto min-h-screen">
      <Head>
      <title>{`${category ? category.charAt(0).toUpperCase() + category.slice(1) + " Components" : "All Components"} - OpenUI`}</title>
      </Head>
      <div className="flex-1 px-6 lg:px-8 min-h-screen">
        <Header />

        <section className="py-8">
          <div className="text-violet-600 font-medium dark:text-violet-400">
            Free Tailwind Components
          </div>
          <h1 className="py-4 text-4xl font-bold text-gray-800 dark:text-gray-200">
            Build Stunning Interfaces Faster
          </h1>

          <p className="mt-2 text-xl text-gray-600 dark:text-gray-300 font-light max-w-2xl">
            Ship production-ready components with beautiful design.
            <span className="font-medium text-gray-700 dark:text-gray-200">
              {" "}
              Copy & paste{" "}
            </span>
            components tailored for modern web apps. Fully responsive,
            accessible, and dark mode ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
            href="https://github.com/kimkorngmao/openui"
              className="inline-flex gap-2 items-center justify-center rounded-lg text-sm font-semibold py-2 px-3 bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
              aria-label="View source code on GitHub"
            >
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>
              </svg>
              <span className="whitespace-nowrap">Source code</span>
            </Link>
            <Link
              className="inline-flex gap-2 items-center justify-center rounded-lg text-sm font-semibold py-2 px-3 text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25 hover:ring-slate-900/15 dark:text-gray-100 dark:ring-gray-100/10 dark:hover:bg-gray-800/25 dark:hover:ring-gray-100/15"
              href="https://tailwindcss.com/docs/installation/using-vite"
              target="_blank"
              aria-label="Tailwind Installation"
            >
              <span className="whitespace-nowrap">Installation</span>
              <svg
                className="size-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </Link>
          </div>
        </section>

        <nav className="bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-6 items-center overflow-x-auto scrollbar-hide py-3">
            <Link
              href="/"
              className={`shrink-0 border-b-2 text-sm font-medium transition-colors border-transparent ${
                !category
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
              aria-label="View all categories"
            >
              <span className="text-sm font-medium transition-colors">All</span>
            </Link>
            {categories.map((cat) => {
              const categoryName = cat.replace("openui-", "");
              return (
                <Link
                  key={cat}
                  href={`/?category=${categoryName}`}
                  className={`shrink-0 border-b-2 text-sm font-medium transition-colors border-transparent ${
                    category === categoryName
                      ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  }`}
                  aria-label={`View ${categoryName.replace(
                    /-/g,
                    " "
                  )} components`}
                >
                  {categoryName.replace(/-/g, " ")}
                </Link>
              );
            })}
          </div>
        </nav>

        <GridLayout>
          {filesContent.length > 0 ? (
            filesContent.map((file, index) => (
              <article
                key={index}
                className="h-fit relative group"
              >
                <div
                  className="w-full"
                  dangerouslySetInnerHTML={{ __html: file.content }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-2 right-2 flex opacity-0 group-hover:opacity-100 duration-200 gap-2 items-center"
                  role="group"
                >
                  <Link
                    href={`https://github.com/kimkorngmao/openui/tree/main/public/components/${file.category}/${file.fileName}`}
                    className="active:scale-95 flex items-center justify-center size-8 p-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                    aria-label="View file on GitHub"
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 8l-4 4l4 4" />
                      <path d="M17 8l4 4l-4 4" />
                      <path d="M14 4l-4 16" />
                    </svg>
                  </Link>

                  <button
                    onClick={() => handleCopy(file.content)}
                    className="active:scale-95 flex items-center justify-center size-8 p-1 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
                    aria-label="Copy component code"
                  >
                    {copied ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M5 12l5 5l10 -10" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
                        <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
                      </svg>
                    )}
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-24 text-center space-y-6">
              <div
                className="text-7xl text-gray-300 dark:text-gray-600"
                aria-hidden="true"
              >
                🧩
              </div>
              <h2 className="text-2xl font-medium text-gray-700 dark:text-gray-300">
                No components found
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                We couldn't find any components matching your selection.
              </p>
            </div>
          )}
        </GridLayout>

        <footer className="mt-12 py-8 text-gray-500 dark:text-gray-400 text-sm">
          <p>
            Made with ❤️ by{" "}
            <a
              href="https://kimkorngmao.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
              aria-label="Visit Korng's website"
            >
              Korng
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}