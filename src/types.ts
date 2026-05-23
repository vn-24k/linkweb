export interface SocialLink {
  id: string;
  label: string;
  url: string;
  icon: string; // Lucide icon key
  description: string;
  category: 'social' | 'project' | 'contact';
  highlight?: boolean;
}

export interface ProfileData {
  name: string;
  role: string;
  bio: string;
  location: string;
  status: 'active' | 'learning' | 'building' | 'available';
  statusText: string;
  avatarPlaceholderSeed: string;
  avatarUrl?: string;
}

export interface ProjectCard {
  title: string;
  description: string;
  tags: string[];
  url: string;
  glowColor?: string;
  achievement?: string;
}
