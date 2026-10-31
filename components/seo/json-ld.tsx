export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

export function articleJsonLd({
  title,
  description,
  path,
  datePublished = "2026-01-15",
  dateModified = "2026-03-01",
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = new URL(path, base).toString();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: "MakeUp Face Ai" },
    publisher: {
      "@type": "Organization",
      name: "MakeUp Face Ai",
      url: base,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: new URL(item.path, base).toString(),
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
