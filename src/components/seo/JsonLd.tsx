export function JsonLd({ data }: { data: unknown }) {
  const scriptContent = {
    __html: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={scriptContent} />
  );
}
