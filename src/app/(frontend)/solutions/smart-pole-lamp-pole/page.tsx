import { DesignFrame } from "@/components/sites/figma-jitrapadu/shared/DesignFrame";
import { SolutionDesign } from "@/components/sites/figma-jitrapadu/solution-design";
export const metadata = { title: "Smart Pole & Lamp Pole Solutions | Jitrapadu Engineering", description: "Customisable pole infrastructure for lighting, connectivity, 5G and smart city applications." };
export default function Page() {
  return <DesignFrame page="smart-pole" height={0}><SolutionDesign solution="smart-pole-lamp-pole" /></DesignFrame>;
}
