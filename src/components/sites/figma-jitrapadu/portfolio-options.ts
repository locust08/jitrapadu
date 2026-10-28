import { solutionData } from "./solution-data";

export const portfolioOptions = [
  { id: "all", label: "All Projects", description: "" },
  { id: "telecom-tower-monopole", label: "Telecom Tower & Monopole", description: "Explore selected tower and monopole projects that show our ability to deliver reliable structures for different heights, locations, load requirements and site conditions." },
  { id: "rapid-deployment-system", label: "Rapid Deployment System", description: solutionData["rapid-deployment-system"].featuredIntro },
  { id: "smart-pole-lamp-pole", label: "Smart Pole & Lamp Pole", description: solutionData["smart-pole-lamp-pole"].featuredIntro },
] as const;
