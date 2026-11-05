import { clientAsset } from "./solution-assets";

export type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  location: string;
};

export const projects: Project[] = [
  { title: "Teluk Muroh, Manjung, Perak", category: "telecom-tower-monopole", description: "45m 3-legged light-duty tower", image: "/sites/figma-jitrapadu/shared/7c4f4.png", location: "Manjung, Perak" },
  { title: "Kg Permatang Tulang, Melaka", category: "telecom-tower-monopole", description: "45m 3-legged light-duty tower", image: "/sites/figma-jitrapadu/shared/0bbc3.png", location: "Melaka" },
  { title: "KPM Ayer Molek, Melaka", category: "telecom-tower-monopole", description: "36m monopole for 5 telco sharers", image: "/sites/figma-jitrapadu/shared/42ef4.png", location: "Melaka" },
  // Names, locations, structures and image assignments from the latest client Figma.
  { title: "Kajang, Selangor", category: "rapid-deployment-system", description: "24m 2 telco-sharer with RDS base", image: clientAsset("37d11"), location: "Kajang, Selangor" },
  { title: "Changkat Jong, Perak", category: "rapid-deployment-system", description: "45m 4-legged light-duty tower with RDS base", image: clientAsset("f4b94"), location: "Changkat Jong, Perak" },
  { title: "Paka, Terengganu", category: "rapid-deployment-system", description: "24m Portable Base", image: clientAsset("cbb4b"), location: "Paka, Terengganu" },
  { title: "Juru, Pulau Pinang", category: "smart-pole-lamp-pole", description: "18m Double-deck Smart Pole", image: clientAsset("d9728"), location: "Juru, Pulau Pinang" },
  { title: "Senai, Johor Bharu", category: "smart-pole-lamp-pole", description: "30m Double-deck Smart Pole", image: clientAsset("e1897"), location: "Senai, Johor Bharu" },
  { title: "Jalan Telok Kumbar, Pulau Pinang", category: "smart-pole-lamp-pole", description: "18m lamp-pole for single telco", image: clientAsset("783d9"), location: "Jalan Telok Kumbar, Pulau Pinang" },
];

export function projectsForSolution(category: string): Project[] {
  return projects.filter(project => project.category === category);
}
