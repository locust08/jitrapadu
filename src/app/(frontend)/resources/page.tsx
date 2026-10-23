import { ResourcesDesign } from "@/components/sites/figma-jitrapadu/resources-design";
import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";
export const metadata = { title: "Resources | Jitrapadu Engineering" };
export default function Page() { return <DesignFrame page="resources" height={0}><ResourcesDesign /></DesignFrame>; }
