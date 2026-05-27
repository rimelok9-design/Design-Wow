export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: "Blog" | "News" | "Tutorial";
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
}

export const mockArticles: Article[] = [
  {
    id: "a1",
    title: "Construire des APIs résilientes pour les réseaux instables",
    excerpt: "Comment concevoir des APIs mobile-first qui gèrent gracieusement les connexions réseau peu fiables, fréquentes en Afrique de l'Ouest.",
    content: "Contenu complet de l'article...",
    category: "Tutorial",
    author: "Marcel Houngbédji",
    authorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-01-10",
    readTime: "8",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    tags: ["API", "Backend", "Mobile", "Architecture"]
  },
  {
    id: "a2",
    title: "L'essor des développeurs Web3 en Afrique de l'Ouest",
    excerpt: "Comment les développeurs de Cotonou, Lagos et Accra construisent la prochaine génération d'applications décentralisées pour l'Afrique.",
    content: "Contenu complet de l'article...",
    category: "News",
    author: "Aïssatou Sègnon",
    authorAvatar: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-01-28",
    readTime: "5",
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
    tags: ["Web3", "Blockchain", "Communauté", "Tendance"]
  },
  {
    id: "a3",
    title: "De l'autodidacte au Senior Engineer en 3 ans",
    excerpt: "Mon parcours dans la tech sans diplôme en informatique. Les stratégies concrètes qui m'ont permis de décrocher un poste Senior.",
    content: "Contenu complet de l'article...",
    category: "Blog",
    author: "Théodore Gbèdji",
    authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-02-15",
    readTime: "12",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tags: ["Carrière", "Inspiration", "Autodidacte"]
  },
  {
    id: "a4",
    title: "React Server Components : Guide complet",
    excerpt: "Plongée en profondeur dans la façon dont les RSC changent le paradigme de construction des applications React et améliorent les performances.",
    content: "Contenu complet de l'article...",
    category: "Tutorial",
    author: "Rosine Dossou",
    authorAvatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-03-05",
    readTime: "10",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Frontend", "Performance", "Next.js"]
  },
  {
    id: "a5",
    title: "DevBenin Hackathon 2024 — Les gagnants révélés",
    excerpt: "Découvrez les projets impressionnants qui ont remporté les premiers prix lors de notre hackathon communautaire annuel.",
    content: "Contenu complet de l'article...",
    category: "News",
    author: "Fabrice Zinsou",
    authorAvatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-04-22",
    readTime: "3",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    tags: ["Hackathon", "Communauté", "Récompenses"]
  },
  {
    id: "a6",
    title: "Optimiser PostgreSQL pour les ledgers financiers",
    excerpt: "Les stratégies d'indexation et de conception de schéma pour scaler un système de paiement mobile béninois à des millions de transactions.",
    content: "Contenu complet de l'article...",
    category: "Tutorial",
    author: "Kofi Adjovi",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-04-10",
    readTime: "15",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Base de données", "PostgreSQL", "FinTech", "Scaling"]
  },
  {
    id: "a7",
    title: "Pourquoi j'ai migré de VS Code à Neovim",
    excerpt: "Les gains de productivité, la courbe d'apprentissage et pourquoi je ne suis jamais revenu en arrière depuis ce changement.",
    content: "Contenu complet de l'article...",
    category: "Blog",
    author: "Gabin Tokponnon",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-05-18",
    readTime: "7",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    tags: ["Outils", "Productivité", "Neovim", "Éditeurs"]
  },
  {
    id: "a8",
    title: "Introduction à Rust pour les développeurs Node.js",
    excerpt: "Un guide pratique pour comprendre le modèle de propriété de Rust et construire votre premier outil CLI haute performance.",
    content: "Contenu complet de l'article...",
    category: "Tutorial",
    author: "Gabin Tokponnon",
    authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-05-25",
    readTime: "14",
    imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800",
    tags: ["Rust", "Backend", "Node.js", "Apprentissage"]
  },
  {
    id: "a9",
    title: "Cotonou Tech Week 2024 — Les grandes annonces",
    excerpt: "Retour sur les moments forts, annonces et tendances de la plus grande conférence tech du Bénin.",
    content: "Contenu complet de l'article...",
    category: "News",
    author: "Christelle Akpo",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-06-12",
    readTime: "6",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    tags: ["Conférence", "Cotonou", "Événements", "Communauté"]
  },
  {
    id: "a10",
    title: "Accessibilité web : concevoir pour tous",
    excerpt: "Étapes pratiques pour rendre votre application béninoise utilisable par tous, quelle que soit la capacité ou le type d'appareil.",
    content: "Contenu complet de l'article...",
    category: "Blog",
    author: "Sylvie Kpêdékpo",
    authorAvatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face&auto=format",
    publishedAt: "2024-06-30",
    readTime: "9",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    tags: ["Design", "Accessibilité", "UX", "Mobile"]
  }
];
