import { notFound } from "next/navigation";
import { PageShell } from "@/components/content/page-shell";
import { ToolPageClient } from "@/components/tools/tool-page-client";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/json-ld";
import { beautyTools } from "@/data/tools";
import { createMetadata } from "@/lib/seo/metadata";

type Props = { params: Promise<{ tool: string }> };

export function generateStaticParams() {
  return beautyTools.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { tool: slug } = await params;
  const tool = beautyTools.find((t) => t.slug === slug);
  if (!tool) return {};
  return createMetadata({
    title: tool.seoTitle,
    description: tool.seoDescription,
    path: `/tools/${tool.slug}`,
  });
}

export default async function ToolPage({ params }: Props) {
  const { tool: slug } = await params;
  const tool = beautyTools.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Beauty tools", path: "/tools" },
          { name: tool.title, path: `/tools/${tool.slug}` },
        ])}
      />
      {tool.faqs.length > 0 && (
        <JsonLd data={faqJsonLd(tool.faqs)} />
      )}
      <PageShell
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Beauty tools", href: "/tools" },
          { label: tool.title },
        ]}
        eyebrow={tool.category.replace(/^\w/, (c) => c.toUpperCase())}
        title={tool.title}
        lead={tool.description}
      >
        <ToolPageClient tool={tool} />
      </PageShell>
    </>
  );
}
