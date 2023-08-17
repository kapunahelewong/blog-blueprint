import { getContent, getBuilderSearchParams } from "@builder.io/sdk-qwik";

// TO DO: Add your API Key
export const BUILDER_PUBLIC_API_KEY = "e6ebe32dd1d94a6ba274559daf618a92";

const articlesPerPage = 30;

export default component$(() => {
  const articlesRsrc = useResource$(() =>
    getContent({
      model: "blog-article",
      apiKey: BUILDER_PUBLIC_API_KEY,
      options: {
        limit: articlesPerPage,
        includeRefs: true,
        omit: "data.blocks",
      },
    })
  );

  return (
    <div>
      <Resource
        value={articlesRsrc}
        onPending={() => <div>Loading articles...</div>}
        onResolved={(articles) => {
          return articles.map((article) => (
            <Link href={`/blog/${article.data.handle}`}>
              <div css={{ overflow: "hidden", width: 300 }}>
                <div css={{ width: 300, height: 200, display: "block" }}>
                  <img src={article.data.image} />
                </div>
                {article.data.title}
                {article.data.description}
              </div>
            </Link>
          ));
        }}
      />
    </div>
  );
});
