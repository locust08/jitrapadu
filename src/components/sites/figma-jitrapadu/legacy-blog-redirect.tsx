"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { blogCategories, blogCategoryHref } from "./blog-routes";

export function LegacyBlogRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const href = blogCategoryHref(searchParams.get("category"));
  useEffect(() => { router.replace(href); }, [href, router]);
  return <main className="archive-loading"><h1>Our updates have moved to Blog</h1><p><Link href={href}>Continue to Blog</Link></p><nav aria-label="Blog categories">{blogCategories.map(item => <p key={item.slug}><Link href={item.href}>{item.label}</Link></p>)}</nav></main>;
}
