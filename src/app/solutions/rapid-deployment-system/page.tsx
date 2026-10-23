import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";
import { SolutionDesign } from "@/components/sites/figma-jitrapadu/solution-design";
export const metadata = { title: "Rapid Deployment System (RDS) | Jitrapadu Engineering", description: "Flexible telecommunications infrastructure for temporary, urgent and relocatable network deployment." };
export default function Page() {
  return <DesignFrame page="rds" height={0}><SolutionDesign solution="rapid-deployment-system" /></DesignFrame>;
}
