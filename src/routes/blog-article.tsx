import { getContent } from "@builder.io/sdk-qwik";

export const BUILDER_PUBLIC_API_KEY = YOUR_KEY;

export default component$(({ params: { article } }) => {
  const isPreviewing = useIsPreviewing();

  const articleRsrc = useResource$(() =>
    getContent({
      model: "blog-article",
      apiKey: BUILDER_PUBLIC_API_KEY,
      query: { "data.handle": article },
      options: { includeRefs: true },
    })
  );

  if (!articleRsrc.resolvedValue && !isPreviewing) {
    return <div>Article not found</div>;
  }

  return (
    <Resource
      value={articleRsrc}
      onPending={() => <div>Loading article...</div>}
      onResolved={(article) => (
        <>
          <Head>
            {/* Render meta tags from custom field */}
            <title>{article.data.title}</title>
            <meta name="description" content={article.data.blurb} />
            <meta name="og:image" content={article.data.image} />
          </Head>

          <div>
            <div>{article.data.title}</div>
            <RenderContent
              model="blog-article"
              content={article}
              apiKey={BUILDER_PUBLIC_API_KEY}
              options={{ includeRefs: true }}
            />
          </div>
        </>
      )}
    />
  );
});
