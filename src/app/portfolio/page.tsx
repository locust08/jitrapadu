import { PortfolioDesign } from "@/components/sites/figma-jitrapadu/portfolio-design";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export const metadata = { title: "Portfolio | Jitrapadu Engineering", description: "Explore Jitrapadu's telecom tower and monopole projects across Malaysia." };

export default function Page() {
  return <DesignFrame page="portfolio" height={0}><PortfolioDesign /></DesignFrame>;
}
