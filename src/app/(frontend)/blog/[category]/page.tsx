import { notFound } from "next/navigation";
import { EditorialArchive } from "@/components/sites/figma-jitrapadu/editorial";
import { blogCategories } from "@/components/sites/figma-jitrapadu/blog-routes";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export function generateStaticParams() {
  return blogCategories.map(item => ({ category: item.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = blogCategories.find(item => item.slug === category);
  return { title: item ? `${item.label} | Blog | Jitrapadu Engineering` : "Category not found" };
}
export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const item = blogCategories.find(item => item.slug === category);
  if (!item) notFound();
  return <DesignFrame page="blog" height={0}><EditorialArchive kind="news-events" category={item.label} /></DesignFrame>;
}
