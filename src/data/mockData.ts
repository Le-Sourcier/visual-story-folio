export interface Project {
  id: string;
  title: string;
  category: 'UI/UX' | 'Branding' | 'Web' | 'Art' | 'Photo';
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface Award {
  title: string;
  year: string;
  organization: string;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Lumina App Redesign',
    category: 'UI/UX',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/project-uiux-fa90eb77-1770728430779.webp',
    description: 'A complete overhaul of the Lumina ecosystem focusing on accessibility and seamless user flow.',
    challenge: 'The original app had a high churn rate due to complex navigation and outdated design patterns.',
    solution: 'We simplified the navigation to a core 3-tab system and introduced a design language based on "clarity and light".',
    results: ['45% increase in daily active users', '30% reduction in support tickets', 'Apple Design Award Nominee']
  },
  {
    id: '2',
    title: 'Aura Brand Identity',
    category: 'Branding',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/project-branding-3717b1d4-1770728434911.webp',
    description: 'Crafting a visual language for a sustainable luxury fragrance line.',
    challenge: 'Aura needed to stand out in a crowded market while conveying both luxury and eco-consciousness.',
    solution: 'Used minimalist typography paired with organic textures and earthy color palettes.',
    results: ['Successfully launched in 12 global boutiques', 'Featured in Vogue and Wallpaper*', '100% plastic-free packaging design']
  },
  {
    id: '3',
    title: 'Neo-Nexus Platform',
    category: 'Web',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/project-webdev-97b00c0c-1770728430056.webp',
    description: 'A next-generation developer dashboard with real-time analytics.',
    challenge: 'Visualizing complex data streams without overwhelming the user.',
    solution: 'Implemented a customizable widget system with high-performance WebGL visualizations.',
    results: ['Handled 1M+ events/second with low latency', 'Open-source components used by 5k+ developers', 'Performance optimized for low-end devices']
  },
  {
    id: '4',
    title: 'Urban Fragments',
    category: 'Photo',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/project-photography-5342a0e6-1770728429882.webp',
    description: 'A series exploring the intersection of modern architecture and natural light.',
    challenge: 'Capturing the fleeting moments of "golden hour" in dense urban environments.',
    solution: 'Used long-exposure techniques and high-contrast editing to emphasize structural geometry.',
    results: ['Solo exhibition at MoMA PS1', 'Limited edition print run sold out in 48 hours', 'Published in "Metropolis" magazine']
  },
  {
    id: '5',
    title: 'Surreal Horizons',
    category: 'Art',
    image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/project-art-5919be28-1770728434516.webp',
    description: 'Digital illustrations pushing the boundaries of surrealism and color theory.',
    challenge: 'Creating a cohesive world that feels both alien and familiar.',
    solution: 'Experimented with procedural textures and non-traditional perspective.',
    results: ['NFT collection valued at 50 ETH', 'Collaborated with major music artists for album art', 'Featured in Digital Arts Annual']
  }
];

export const AWARDS: Award[] = [
  { title: 'Designer of the Year', year: '2023', organization: 'Awwwards' },
  { title: 'Best Mobile UI', year: '2022', organization: 'Behance' },
  { title: 'Gold Excellence', year: '2022', organization: 'The FWA' },
  { title: 'Innovation in Web', year: '2021', organization: 'CSS Design Awards' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Alex Rivera',
    role: 'CEO, TechFlow',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/testimonial-1-0b068c53-1770728440346.webp',
    content: 'An incredible visionary. They took our vague ideas and turned them into a world-class product.'
  },
  {
    name: 'Sarah Chen',
    role: 'Founder, EcoLuxe',
    avatar: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/testimonial-2-9f00eb86-1770728437843.webp',
    content: 'The level of detail and craft is unmatched. Our branding has never looked better or more professional.'
  }
];