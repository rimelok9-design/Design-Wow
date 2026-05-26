export interface Member {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  city: "Cotonou" | "Lagos" | "Abidjan" | "Dakar" | "Nairobi" | "Accra" | "Cape Town";
  skills: string[];
  level: "Junior" | "Mid" | "Senior";
  github: string;
  linkedin: string;
  twitter: string;
  joinedAt: string;
  projectCount: number;
  quizScore: number;
}

export const mockMembers: Member[] = [
  {
    id: "m1",
    name: "Oluwaseun Adebayo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oluwaseun",
    bio: "Full-stack engineer obsessed with distributed systems and fintech.",
    city: "Lagos",
    skills: ["React", "Node.js", "PostgreSQL", "Go"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-01-15",
    projectCount: 14,
    quizScore: 950
  },
  {
    id: "m2",
    name: "Fatou Diop",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
    bio: "Frontend specialist creating accessible and performant web experiences.",
    city: "Dakar",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "GraphQL"],
    level: "Mid",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-03-22",
    projectCount: 8,
    quizScore: 780
  },
  {
    id: "m3",
    name: "Emmanuel Kiprono",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    bio: "AI researcher building NLP models for African languages.",
    city: "Nairobi",
    skills: ["Python", "PyTorch", "FastAPI", "Docker"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2021-11-05",
    projectCount: 22,
    quizScore: 1120
  },
  {
    id: "m4",
    name: "Chika Nwosu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chika",
    bio: "Mobile developer passionate about offline-first applications.",
    city: "Lagos",
    skills: ["React Native", "Firebase", "Redux", "Swift"],
    level: "Mid",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-05-18",
    projectCount: 6,
    quizScore: 640
  },
  {
    id: "m5",
    name: "Kwame Osei",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame",
    bio: "Backend engineer focused on highly available microservices.",
    city: "Accra",
    skills: ["Go", "Kubernetes", "Redis", "gRPC"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2021-08-30",
    projectCount: 19,
    quizScore: 1050
  },
  {
    id: "m6",
    name: "Amina Diallo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
    bio: "IoT enthusiast building smart hardware solutions for agriculture.",
    city: "Abidjan",
    skills: ["C++", "Python", "MQTT", "Vue"],
    level: "Mid",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-07-12",
    projectCount: 9,
    quizScore: 720
  },
  {
    id: "m7",
    name: "Samuel Ochieng",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    bio: "Ruby on Rails developer who loves elegant code and good tests.",
    city: "Nairobi",
    skills: ["Ruby", "Rails", "PostgreSQL", "React"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2021-12-10",
    projectCount: 16,
    quizScore: 890
  },
  {
    id: "m8",
    name: "Zainab Ali",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
    bio: "Data scientist turning messy data into actionable insights.",
    city: "Cotonou",
    skills: ["Python", "Pandas", "Scikit-Learn", "SQL"],
    level: "Junior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2023-02-15",
    projectCount: 4,
    quizScore: 450
  },
  {
    id: "m9",
    name: "Tunde Bakare",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde",
    bio: "DevOps engineer keeping systems running smoothly 24/7.",
    city: "Lagos",
    skills: ["AWS", "Terraform", "CI/CD", "Bash"],
    level: "Mid",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-09-05",
    projectCount: 11,
    quizScore: 810
  },
  {
    id: "m10",
    name: "Nneka Okeke",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nneka",
    bio: "UI/UX Designer and Frontend Dev bridging the gap between design and code.",
    city: "Lagos",
    skills: ["Figma", "React", "CSS", "Framer Motion"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2021-10-20",
    projectCount: 25,
    quizScore: 980
  },
  {
    id: "m11",
    name: "John Mutua",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Junior web developer eager to learn and build cool things.",
    city: "Nairobi",
    skills: ["HTML", "CSS", "JavaScript", "Vue"],
    level: "Junior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2023-05-10",
    projectCount: 2,
    quizScore: 320
  },
  {
    id: "m12",
    name: "David Mensah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    bio: "Web3 developer exploring decentralized finance and smart contracts.",
    city: "Accra",
    skills: ["Solidity", "React", "Web3.js", "Node.js"],
    level: "Mid",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-11-25",
    projectCount: 7,
    quizScore: 690
  },
  {
    id: "m13",
    name: "Mariam Sow",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariam",
    bio: "Security engineer focused on application and cloud security.",
    city: "Dakar",
    skills: ["Security", "Python", "AWS", "Pen Testing"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2021-09-15",
    projectCount: 13,
    quizScore: 1010
  },
  {
    id: "m14",
    name: "Kofi Annan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi",
    bio: "Systems programmer writing high-performance code in Rust and C.",
    city: "Accra",
    skills: ["Rust", "C", "Linux", "WASM"],
    level: "Senior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2022-02-10",
    projectCount: 18,
    quizScore: 920
  },
  {
    id: "m15",
    name: "Blessing Udo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing",
    bio: "Recent bootcamp grad building a portfolio of full-stack projects.",
    city: "Lagos",
    skills: ["React", "Express", "MongoDB", "Node.js"],
    level: "Junior",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    joinedAt: "2023-06-20",
    projectCount: 3,
    quizScore: 380
  }
];