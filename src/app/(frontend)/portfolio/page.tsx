import { Suspense } from "react";
import { PortfolioDesign } from "@/components/sites/figma-jitrapadu/portfolio-design";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export const metadata = { title: "Portfolio | Jitrapadu Engineering", description: "Explore Jitrapadu's telecom tower and monopole projects across Malaysia." };

export default function Page() {
  return <Suspense fallback={<p className="portfolio-loading" role="status">Loading projects…</p>}><DesignFrame page="portfolio" height={0}><PortfolioDesign /></DesignFrame></Suspense>;
}
