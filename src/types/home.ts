export interface StatItem {
  value: string;
  label: string;
}

export interface Discipline {
  title: string;
  description: string;
  icon: "robotics" | "automation" | "ai" | "design";
}

export interface TeamMember {
  name: string;
  role: string;
  tag: string;
  image?: string;
}