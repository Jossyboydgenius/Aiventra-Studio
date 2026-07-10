import ServiceClient from "./service-client";

export async function generateStaticParams() {
  return [
    { slug: "web-development" },
    { slug: "mobile-app-development" },
    { slug: "lead-generation-funnels" },
    { slug: "e-commerce-revenue-setup" },
    { slug: "booking-crm-pipelines" },
    { slug: "ai-workflows-automation" },
  ];
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ServiceClient slug={slug} />;
}
