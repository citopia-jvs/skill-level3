import { CACHE_KEY, CACHE_DURATION } from "../constants/api";
import type { CachedImage } from "../types/api";

export const getUserImage = async (
  firstName: string,
  lastName: string
): Promise<string> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      const data: CachedImage = JSON.parse(cached);
      const isValid = Date.now() - data.timestamp < CACHE_DURATION;
      const isSameUser =
        data.firstName === firstName && data.lastName === lastName;

      if (isValid && isSameUser) {
        return data.url;
      }
    }
  } catch (error) {
    console.error("Erreur lecture cache:", error);
  }

  try {
    const response = await fetch(
      `https://dummyjson.com/users/search?q=${firstName}%20${lastName}`
    );

    if (!response.ok) {
      throw new Error("Erreur API");
    }

    const data = await response.json();

    if (data?.users && data.users.length > 0) {
      const imageUrl = data.users[0].image;

      const cacheData: CachedImage = {
        url: imageUrl,
        timestamp: Date.now(),
        firstName,
        lastName,
      };

      localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));

      return imageUrl;
    }

    throw new Error("Utilisateur non trouvé");
  } catch (error) {
    console.error("Erreur fetch image:", error);

    const name = firstName && lastName ? `${firstName}+${lastName}` : "User";

    return `https://ui-avatars.com/api/?name=${name}&size=128&background=random`;
  }
};
