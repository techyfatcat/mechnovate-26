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
  {
    name: "Dr. G. Viswanathan",
    role: "Founder & Chancellor, VIT",
    tag: "Chief Patron",
    image: "/images/team/member1.jpeg",
  },
  {
    name: "Dr. VS Kanchana Bhaskaran",
    role: "Vice Chancellor, VIT",
    tag: "Co-Patron",
    image: "/images/team/member2.jpg",
  },
  {
    name: "Dr. Paratha Sarathi Mallick",
    role: "Pro Vice Chancellor, VIT",
    tag: "Co-Patron",
    image: "/images/team/member3.png",
  },
  {
    name: "Dr. Naiju C.D.",
    role: "Director Of Student Welfare",
    tag: "Symposium Chair",
    image: "/images/team/member4.jpg",
  },
  {
    name: "Dr. Anthony Xavier M",
    role: "Dean, Academics",
    tag: "ASME-VIT Advisor",
    image: "/images/team/member5.jpg",
  },
  {
    name: "Dr. Jeyapandiarajan P",
    role: "Associate Professor, School of Mechanical Engineering",
    tag: "Convenor",
    image: "/images/team/member6.jpg",
  },
  {
    name: "Dr. Joel J",
    role: "Associate Professor Senior, School of Mechanical Engineering",
    tag: "Co-Convenor",
    image: "/images/team/member7.png",
  },
];
