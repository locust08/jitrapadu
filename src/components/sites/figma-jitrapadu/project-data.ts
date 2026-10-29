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
];

export function projectsForSolution(category: string): Project[] {
  return projects.filter(project => project.category === category);
}
