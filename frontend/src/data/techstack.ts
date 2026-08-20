import {
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer,
  SiNodedotjs, SiNestjs, SiPython, SiPostgresql, SiMongodb, SiRedis, SiFastapi,
  SiKotlin, SiDocker, SiVercel, SiGithub, SiNginx, SiTensorflow, SiFigma, SiFlutter, SiSwift, SiExpo
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Brain, Workflow } from "lucide-react";

export const techCategories = [
  {
    id: "frontend",
    name: "Frontend",
    techs: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    techs: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "NestJS", icon: SiNestjs },
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    id: "mobile",
    name: "Mobile",
    techs: [
      { name: "React Native", icon: SiReact },
      { name: "Flutter", icon: SiFlutter },
      { name: "Swift", icon: SiSwift },
      { name: "Kotlin", icon: SiKotlin },
      { name: "Expo", icon: SiExpo },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    techs: [
      { name: "AWS", icon: FaAws },
      { name: "Docker", icon: SiDocker },
      { name: "Vercel", icon: SiVercel },
      { name: "GitHub CI/CD", icon: SiGithub },
      { name: "Nginx", icon: SiNginx },
    ],
  },
  {
    id: "data",
    name: "AI & Data",
    techs: [
      { name: "OpenAI",icon: Brain },
      { name: "LangChain", icon: Brain },
      { name: "n8n", icon: Workflow },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Figma", icon: SiFigma },
    ],
  },
];
