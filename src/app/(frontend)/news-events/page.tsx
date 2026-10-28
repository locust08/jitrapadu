import { Suspense } from "react";
import { LegacyBlogRedirect } from "@/components/sites/figma-jitrapadu/legacy-blog-redirect";

export const metadata = { title: "Blog | Jitrapadu Engineering", robots: { index: false, follow: true } };
export default function Page() {
  return <Suspense fallback={<p className="archive-loading" role="status">Opening Blog…</p>}><LegacyBlogRedirect /></Suspense>;
}
