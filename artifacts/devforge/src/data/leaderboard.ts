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
  { rank: 1,  userId: "m3",  name: "Marcel Houngbédji",  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 1120, quizzesCompleted: 45, streak: 12 },
  { rank: 2,  userId: "m5",  name: "Théodore Gbèdji",    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 1050, quizzesCompleted: 42, streak: 8  },
  { rank: 3,  userId: "m13", name: "Aïssatou Sègnon",    avatar: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 1010, quizzesCompleted: 40, streak: 15 },
  { rank: 4,  userId: "m10", name: "Fabrice Zinsou",      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 980,  quizzesCompleted: 38, streak: 5  },
  { rank: 5,  userId: "m1",  name: "Kofi Adjovi",         avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 950,  quizzesCompleted: 36, streak: 7  },
  { rank: 6,  userId: "m14", name: "Gabin Tokponnon",     avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face&auto=format", city: "Natitingou", totalScore: 920,  quizzesCompleted: 35, streak: 4  },
  { rank: 7,  userId: "m7",  name: "Christelle Akpo",     avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face&auto=format", city: "Porto-Novo", totalScore: 890,  quizzesCompleted: 32, streak: 9  },
  { rank: 8,  userId: "m9",  name: "Brice Aïnadou",       avatar: "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 810,  quizzesCompleted: 30, streak: 3  },
  { rank: 9,  userId: "m2",  name: "Rosine Dossou",       avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&crop=face&auto=format", city: "Porto-Novo", totalScore: 780,  quizzesCompleted: 28, streak: 6  },
  { rank: 10, userId: "m6",  name: "Arnaud Loko",         avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format", city: "Abomey",     totalScore: 720,  quizzesCompleted: 25, streak: 2  },
  { rank: 11, userId: "m12", name: "Joël Hounkpatin",     avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 690,  quizzesCompleted: 24, streak: 4  },
  { rank: 12, userId: "m4",  name: "Sylvie Kpêdékpo",    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&h=200&fit=crop&crop=face&auto=format", city: "Parakou",    totalScore: 640,  quizzesCompleted: 22, streak: 1  },
  { rank: 13, userId: "m8",  name: "Hyacinthe Vodounon",  avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 450,  quizzesCompleted: 15, streak: 0  },
  { rank: 14, userId: "m15", name: "Prudence Agossou",    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&auto=format", city: "Lokossa",    totalScore: 380,  quizzesCompleted: 12, streak: 2  },
  { rank: 15, userId: "m11", name: "Délali Azondekon",    avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=200&h=200&fit=crop&crop=face&auto=format", city: "Ouidah",     totalScore: 320,  quizzesCompleted: 10, streak: 1  },
  { rank: 16, userId: "u16", name: "Gisèle Amoussou",    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 280,  quizzesCompleted: 8,  streak: 0  },
  { rank: 17, userId: "u17", name: "Romain Glèlè",        avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=face&auto=format", city: "Porto-Novo", totalScore: 210,  quizzesCompleted: 6,  streak: 0  },
  { rank: 18, userId: "u18", name: "Nathalie Kiki",        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format", city: "Abomey",     totalScore: 190,  quizzesCompleted: 5,  streak: 1  },
  { rank: 19, userId: "u19", name: "Serge Dèhoumon",      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop&crop=face&auto=format", city: "Parakou",    totalScore: 150,  quizzesCompleted: 4,  streak: 0  },
  { rank: 20, userId: "u20", name: "Carine Hounsounou",   avatar: "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?w=200&h=200&fit=crop&crop=face&auto=format", city: "Cotonou",    totalScore: 120,  quizzesCompleted: 3,  streak: 0  },
];
