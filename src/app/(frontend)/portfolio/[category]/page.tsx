import { Suspense } from "react";
import { notFound } from "next/navigation";
import { PortfolioDesign } from "@/components/sites/figma-jitrapadu/portfolio-design";
import { portfolioOptions, portfolioPath } from "@/components/sites/figma-jitrapadu/portfolio-options";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export function generateStaticParams() {
  return portfolioOptions.filter(item => item.id !== "all").map(item => ({ category: item.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = portfolioOptions.find(item => item.id === category && item.id !== "all");
  if (!item) notFound();
  return { title: `${item.label} | Portfolio | Jitrapadu Engineering`, description: item.description, alternates: { canonical: portfolioPath(item.id) } };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = portfolioOptions.find(item => item.id === category && item.id !== "all");
  if (!item) notFound();
  return <Suspense fallback={<p className="portfolio-loading" role="status">Loading projects…</p>}><DesignFrame page="portfolio" height={0}><PortfolioDesign routeCategory={item.id} /></DesignFrame></Suspense>;
}
