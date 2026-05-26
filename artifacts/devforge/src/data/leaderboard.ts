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
  { rank: 1, userId: "m3", name: "Marcel Houngbédji", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=MarcelHoungbedji", city: "Cotonou", totalScore: 1120, quizzesCompleted: 45, streak: 12 },
  { rank: 2, userId: "m5", name: "Théodore Gbèdji", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=TheodoreGbedji", city: "Cotonou", totalScore: 1050, quizzesCompleted: 42, streak: 8 },
  { rank: 3, userId: "m13", name: "Aïssatou Sègnon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=AissatouSegnon", city: "Cotonou", totalScore: 1010, quizzesCompleted: 40, streak: 15 },
  { rank: 4, userId: "m10", name: "Fabrice Zinsou", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=FabriceZinsou", city: "Cotonou", totalScore: 980, quizzesCompleted: 38, streak: 5 },
  { rank: 5, userId: "m1", name: "Kofi Adjovi", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KofiAdjovi", city: "Cotonou", totalScore: 950, quizzesCompleted: 36, streak: 7 },
  { rank: 6, userId: "m14", name: "Gabin Tokponnon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GabinTokponnon", city: "Natitingou", totalScore: 920, quizzesCompleted: 35, streak: 4 },
  { rank: 7, userId: "m7", name: "Christelle Akpo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ChristelleAkpo", city: "Porto-Novo", totalScore: 890, quizzesCompleted: 32, streak: 9 },
  { rank: 8, userId: "m9", name: "Brice Aïnadou", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BriceAinadou", city: "Cotonou", totalScore: 810, quizzesCompleted: 30, streak: 3 },
  { rank: 9, userId: "m2", name: "Rosine Dossou", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RosineDossou", city: "Porto-Novo", totalScore: 780, quizzesCompleted: 28, streak: 6 },
  { rank: 10, userId: "m6", name: "Arnaud Loko", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ArnaudLoko", city: "Abomey", totalScore: 720, quizzesCompleted: 25, streak: 2 },
  { rank: 11, userId: "m12", name: "Joël Hounkpatin", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=JoelHounkpatin", city: "Cotonou", totalScore: 690, quizzesCompleted: 24, streak: 4 },
  { rank: 12, userId: "m4", name: "Sylvie Kpêdékpo", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SylvieKpedekpo", city: "Parakou", totalScore: 640, quizzesCompleted: 22, streak: 1 },
  { rank: 13, userId: "m8", name: "Hyacinthe Vodounon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=HyacintheVodounon", city: "Cotonou", totalScore: 450, quizzesCompleted: 15, streak: 0 },
  { rank: 14, userId: "m15", name: "Prudence Agossou", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=PrudenceAgossou", city: "Lokossa", totalScore: 380, quizzesCompleted: 12, streak: 2 },
  { rank: 15, userId: "m11", name: "Délali Azondekon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=DelaliAzondekon", city: "Ouidah", totalScore: 320, quizzesCompleted: 10, streak: 1 },
  { rank: 16, userId: "u16", name: "Gisèle Amoussou", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=GiseleAmoussou", city: "Cotonou", totalScore: 280, quizzesCompleted: 8, streak: 0 },
  { rank: 17, userId: "u17", name: "Romain Glèlè", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=RomainGlele", city: "Porto-Novo", totalScore: 210, quizzesCompleted: 6, streak: 0 },
  { rank: 18, userId: "u18", name: "Nathalie Kiki", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=NathalieKiki", city: "Abomey", totalScore: 190, quizzesCompleted: 5, streak: 1 },
  { rank: 19, userId: "u19", name: "Serge Dèhoumon", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=SergeDehoumon", city: "Parakou", totalScore: 150, quizzesCompleted: 4, streak: 0 },
  { rank: 20, userId: "u20", name: "Carine Hounsounou", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CarineHounsounou", city: "Cotonou", totalScore: 120, quizzesCompleted: 3, streak: 0 },
];
