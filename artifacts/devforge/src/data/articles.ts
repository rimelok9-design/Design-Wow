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
    title: "Building Resilient APIs for Intermittent Networks",
    excerpt: "How to design mobile-first APIs that gracefully handle the unreliable network connections often found in emerging markets.",
    content: "Full article content goes here...",
    category: "Tutorial",
    author: "Kwame Osei",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame",
    publishedAt: "2023-12-10",
    readTime: "8 min read",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
    tags: ["API", "Backend", "Mobile", "Architecture"]
  },
  {
    id: "a2",
    title: "The Rise of African Web3 Developers",
    excerpt: "Exploring how developers in Lagos, Nairobi, and Cape Town are building the next generation of decentralized applications.",
    content: "Full article content goes here...",
    category: "News",
    author: "Nneka Okeke",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nneka",
    publishedAt: "2023-11-28",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800",
    tags: ["Web3", "Blockchain", "Community", "Trend"]
  },
  {
    id: "a3",
    title: "My Journey from Self-Taught to Senior Engineer",
    excerpt: "A personal reflection on navigating the tech industry in Accra without a formal computer science degree.",
    content: "Full article content goes here...",
    category: "Blog",
    author: "David Mensah",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    publishedAt: "2023-11-15",
    readTime: "12 min read",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    tags: ["Career", "Inspiration", "Self-Taught"]
  },
  {
    id: "a4",
    title: "Mastering React Server Components",
    excerpt: "A deep dive into how RSCs change the paradigm of building React applications and improving load times.",
    content: "Full article content goes here...",
    category: "Tutorial",
    author: "Fatou Diop",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
    publishedAt: "2023-10-05",
    readTime: "10 min read",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Frontend", "Performance", "Next.js"]
  },
  {
    id: "a5",
    title: "DevForge Hackathon 2023 Winners Announced",
    excerpt: "See the amazing projects that took home the top prizes at our annual pan-African hackathon.",
    content: "Full article content goes here...",
    category: "News",
    author: "DevForge Team",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DevForge",
    publishedAt: "2023-09-22",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    tags: ["Hackathon", "Community", "Awards"]
  },
  {
    id: "a6",
    title: "Optimizing PostgreSQL for Financial Ledgers",
    excerpt: "Learn the indexing and schema design strategies we used to scale AfriPay's transaction ledger.",
    content: "Full article content goes here...",
    category: "Tutorial",
    author: "Oluwaseun Adebayo",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oluwaseun",
    publishedAt: "2023-09-10",
    readTime: "15 min read",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    tags: ["Database", "PostgreSQL", "FinTech", "Scaling"]
  },
  {
    id: "a7",
    title: "Why I Switched from VS Code to Neovim",
    excerpt: "The productivity gains, the steep learning curve, and why I haven't looked back since making the switch.",
    content: "Full article content goes here...",
    category: "Blog",
    author: "Samuel Ochieng",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    publishedAt: "2023-08-18",
    readTime: "7 min read",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    tags: ["Tools", "Productivity", "Neovim", "Editors"]
  },
  {
    id: "a8",
    title: "Introduction to Rust for Node.js Developers",
    excerpt: "A pragmatic guide to understanding Rust's ownership model and building your first CLI tool.",
    content: "Full article content goes here...",
    category: "Tutorial",
    author: "Emmanuel Kiprono",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    publishedAt: "2023-07-25",
    readTime: "14 min read",
    imageUrl: "https://images.unsplash.com/photo-1550439062-609e1531270e?auto=format&fit=crop&q=80&w=800",
    tags: ["Rust", "Backend", "Node.js", "Learning"]
  },
  {
    id: "a9",
    title: "Nairobi Tech Week Highlights",
    excerpt: "Key takeaways, announcements, and trends from East Africa's largest developer conference.",
    content: "Full article content goes here...",
    category: "News",
    author: "Amina Diallo",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
    publishedAt: "2023-07-12",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
    tags: ["Conference", "Nairobi", "Events", "Community"]
  },
  {
    id: "a10",
    title: "Designing for Accessibility in E-commerce",
    excerpt: "Practical steps to ensure your online store is usable by everyone, regardless of ability.",
    content: "Full article content goes here...",
    category: "Blog",
    author: "Chika Nwosu",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chika",
    publishedAt: "2023-06-30",
    readTime: "9 min read",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    tags: ["Design", "Accessibility", "UX", "E-commerce"]
  }
];