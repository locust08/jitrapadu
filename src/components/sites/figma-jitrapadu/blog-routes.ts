export const blogCategories = [
  { slug: "articles", label: "Article", href: "/blog/articles" },
  { slug: "news", label: "News", href: "/blog/news" },
  { slug: "events", label: "Events", href: "/blog/events" },
] as const;

export type BlogCategory = "All" | (typeof blogCategories)[number]["label"];

export function blogCategoryHref(category: string | null): string {
  return blogCategories.find(item => item.label === category)?.href || "/blog";
}
