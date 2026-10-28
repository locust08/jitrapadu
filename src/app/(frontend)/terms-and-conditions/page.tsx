import { LegalDesign } from "@/components/sites/figma-jitrapadu/legal-design";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";

export const metadata = { title: "Terms & Conditions | Jitrapadu Engineering" };
export default function Page() {
  return <DesignFrame page="terms-and-conditions" height={0}><LegalDesign kind="terms-and-conditions" /></DesignFrame>;
}
