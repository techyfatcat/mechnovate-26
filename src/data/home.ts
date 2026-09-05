import type { Discipline, StatItem, TeamMember } from "@/types/home";

export const stats: StatItem[] = [
  { value: "100+", label: "Active Members" },
  { value: "25+", label: "Projects Built" },
  { value: "15+", label: "Awards Won" },
  { value: "20+", label: "Events Organized" },
];

export const disciplines: Discipline[] = [
  { title: "Robotics", description: "Build intelligent machines", icon: "robotics" },
  { title: "Automation", description: "Smart systems & control", icon: "automation" },
  { title: "AI & Embedded", description: "Intelligence in machines", icon: "ai" },
  { title: "Mechanical Design", description: "Innovate & manufacture", icon: "design" },
];

export const team: TeamMember[] = [
  { name: "Rohan Verma", role: "President" },
  { name: "Aaditya Singh", role: "Vice President" },
  { name: "Arjun Mehta", role: "Technical Lead" },
  { name: "Ishita Sharma", role: "Design Lead" },
  { name: "Kartik Rao", role: "Outreach Head" },
  { name: "Priya Nair", role: "Marketing Head" },
];
