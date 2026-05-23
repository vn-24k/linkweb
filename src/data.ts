import { ProfileData, SocialLink, ProjectCard } from './types';

export const PROFILE: ProfileData = {
  name: "Vinícius Silva",
  role: "AI STRATEGIST • DIGITAL BRANDING",
  bio: "",
  location: "Brasil",
  status: "available",
  statusText: "DISPONÍVEL PARA PROJETOS",
  avatarPlaceholderSeed: "cyan-aura",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "portfolio",
    label: "Meu Portfólio",
    url: "https://portfoliocaetano.vercel.app",
    icon: "Briefcase",
    description: "",
    category: "project",
    highlight: false,
  },
  {
    id: "consultoria",
    label: "Consultoria Estratégica",
    url: "https://wa.me/5511999999999", // Can be customized by the user
    icon: "MessageSquare",
    description: "",
    category: "contact",
    highlight: false,
  },
  {
    id: "tiktok",
    label: "Insights no TikTok",
    url: "https://www.tiktok.com/@_planetnews",
    icon: "Tiktok",
    description: "",
    category: "social",
    highlight: false,
  },
  {
    id: "contact",
    label: "Contato Direto",
    url: "mailto:imports.vclb@gmail.com",
    icon: "Mail",
    description: "",
    category: "contact",
    highlight: false,
  }
];

export const RECENT_PROJECTS: ProjectCard[] = [
  {
    title: "NeuroFlow Synthesizer",
    description: "Orquestrador de modelos cognitivos com renderização gráfica baseada em nós em tempo real.",
    tags: ["React", "WebAudio", "Google AI", "Three.js"],
    url: "https://github.com",
    glowColor: "rgba(147, 51, 234, 0.4)", // Purple
    achievement: "Vencedor Hackathon"
  },
  {
    title: "Lumina SDK",
    description: "Biblioteca CSS/JS ultra-leve para simular física ótica de vidro e refração em displays web.",
    tags: ["Vite", "WebGPU", "Tailwind v4", "TypeScript"],
    url: "https://github.com",
    glowColor: "rgba(59, 130, 246, 0.4)", // Blue
    achievement: "1.2k+ Stars"
  },
  {
    title: "Aura Voice Agent",
    description: "Assistente de voz artificial com latência ultrabaixa alimentado pelo Gemini Live API.",
    tags: ["Node.js", "WebSockets", "Gemini API", "React 19"],
    url: "https://github.com",
    glowColor: "rgba(16, 185, 129, 0.4)", // Emerald
    achievement: "Beta Fechado"
  }
];
