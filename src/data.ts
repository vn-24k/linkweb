import { ProfileData, SocialLink, ProjectCard } from './types';

export const PROFILE: ProfileData = {
  name: "Vinícius Silva",
  role: "AI & Creative Engineer",
  bio: "Especialista em construir interfaces e aplicativos imersivos de ponta, resolvendo problemas complexos com código limpo e design de altíssima performance.",
  location: "Brasil",
  status: "building",
  statusText: "Forjando novos portais interativos",
  avatarPlaceholderSeed: "gradient-cyber",
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "portfolio",
    label: "Web Portfolio",
    url: "https://portifoliocaetano.vercel.app",
    icon: "Globe",
    description: "Meu portfólio completo com projetos interativos, artigos e experimentos visuais 3D.",
    category: "social",
    highlight: true,
  },
  {
    id: "github",
    label: "GitHub Repositories",
    url: "https://github.com",
    icon: "Github",
    description: "Espaço onde transformo matemática e arquiteturas de software em código aberto.",
    category: "social",
    highlight: false,
  },
  {
    id: "tiktok",
    label: "TikTok Creator",
    url: "https://www.tiktok.com",
    icon: "Video",
    description: "Vídeos sobre desenvolvimento para web imersiva, truques de CSS e inteligência artificial.",
    category: "social",
    highlight: false,
  },
  {
    id: "contact",
    label: "Fale Comigo",
    url: "mailto:manuellesilva0305@gmail.com",
    icon: "Mail",
    description: "Tem uma parceria de alto nível ou projeto sob medida? Envie um e-mail direto.",
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
