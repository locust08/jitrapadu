import { LegalDesign } from "@/components/sites/figma-jitrapadu/legal-design";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export const metadata = { title: "Disclaimer | Jitrapadu Engineering" };
export default function Page() {
  return <DesignFrame page="disclaimer" height={0}><LegalDesign kind="disclaimer" /></DesignFrame>;
}
