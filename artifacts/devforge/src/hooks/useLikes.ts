import { useLocalStorage } from "./useLocalStorage";

export function useLikes() {
  const [likedProjectIds, setLikedProjectIds] = useLocalStorage<string[]>(
    "devforge_likes",
    []
  );

  const toggleLike = (projectId: string) => {
    setLikedProjectIds((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const isLiked = (projectId: string) => likedProjectIds.includes(projectId);

  return { likedProjectIds, toggleLike, isLiked };
}
