export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  city: string;
  totalScore: number;
  quizzesCompleted: number;
  streak: number;
}

export const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "m3",
    name: "Emmanuel Kiprono",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    city: "Nairobi",
    totalScore: 1120,
    quizzesCompleted: 45,
    streak: 12
  },
  {
    rank: 2,
    userId: "m5",
    name: "Kwame Osei",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame",
    city: "Accra",
    totalScore: 1050,
    quizzesCompleted: 42,
    streak: 8
  },
  {
    rank: 3,
    userId: "m13",
    name: "Mariam Sow",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mariam",
    city: "Dakar",
    totalScore: 1010,
    quizzesCompleted: 40,
    streak: 15
  },
  {
    rank: 4,
    userId: "m10",
    name: "Nneka Okeke",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nneka",
    city: "Lagos",
    totalScore: 980,
    quizzesCompleted: 38,
    streak: 5
  },
  {
    rank: 5,
    userId: "m1",
    name: "Oluwaseun Adebayo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oluwaseun",
    city: "Lagos",
    totalScore: 950,
    quizzesCompleted: 36,
    streak: 7
  },
  {
    rank: 6,
    userId: "m14",
    name: "Kofi Annan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kofi",
    city: "Accra",
    totalScore: 920,
    quizzesCompleted: 35,
    streak: 4
  },
  {
    rank: 7,
    userId: "m7",
    name: "Samuel Ochieng",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    city: "Nairobi",
    totalScore: 890,
    quizzesCompleted: 32,
    streak: 9
  },
  {
    rank: 8,
    userId: "m9",
    name: "Tunde Bakare",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tunde",
    city: "Lagos",
    totalScore: 810,
    quizzesCompleted: 30,
    streak: 3
  },
  {
    rank: 9,
    userId: "m2",
    name: "Fatou Diop",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatou",
    city: "Dakar",
    totalScore: 780,
    quizzesCompleted: 28,
    streak: 6
  },
  {
    rank: 10,
    userId: "m6",
    name: "Amina Diallo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amina",
    city: "Abidjan",
    totalScore: 720,
    quizzesCompleted: 25,
    streak: 2
  },
  {
    rank: 11,
    userId: "m12",
    name: "David Mensah",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    city: "Accra",
    totalScore: 690,
    quizzesCompleted: 24,
    streak: 4
  },
  {
    rank: 12,
    userId: "m4",
    name: "Chika Nwosu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chika",
    city: "Lagos",
    totalScore: 640,
    quizzesCompleted: 22,
    streak: 1
  },
  {
    rank: 13,
    userId: "m8",
    name: "Zainab Ali",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zainab",
    city: "Cotonou",
    totalScore: 450,
    quizzesCompleted: 15,
    streak: 0
  },
  {
    rank: 14,
    userId: "m15",
    name: "Blessing Udo",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Blessing",
    city: "Lagos",
    totalScore: 380,
    quizzesCompleted: 12,
    streak: 2
  },
  {
    rank: 15,
    userId: "m11",
    name: "John Mutua",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    city: "Nairobi",
    totalScore: 320,
    quizzesCompleted: 10,
    streak: 1
  },
  {
    rank: 16,
    userId: "u16",
    name: "Sarah Ibrahim",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    city: "Abidjan",
    totalScore: 280,
    quizzesCompleted: 8,
    streak: 0
  },
  {
    rank: 17,
    userId: "u17",
    name: "Musa Hassan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Musa",
    city: "Kano",
    totalScore: 210,
    quizzesCompleted: 6,
    streak: 0
  },
  {
    rank: 18,
    userId: "u18",
    name: "Grace Ofori",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Grace",
    city: "Kumasi",
    totalScore: 190,
    quizzesCompleted: 5,
    streak: 1
  },
  {
    rank: 19,
    userId: "u19",
    name: "Aliyu Mohammed",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aliyu",
    city: "Abuja",
    totalScore: 150,
    quizzesCompleted: 4,
    streak: 0
  },
  {
    rank: 20,
    userId: "u20",
    name: "Joy Kalu",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joy",
    city: "Port Harcourt",
    totalScore: 120,
    quizzesCompleted: 3,
    streak: 0
  }
];