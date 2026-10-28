import { LegalDesign } from "@/components/sites/figma-jitrapadu/legal-design";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export const metadata = { title: "Privacy Policy | Jitrapadu Engineering" };
export default function Page() {
  return <DesignFrame page="privacy-policy" height={0}><LegalDesign kind="privacy-policy" /></DesignFrame>;
}
