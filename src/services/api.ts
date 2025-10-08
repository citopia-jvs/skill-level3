export function getUserImageUrl(firstName: string, lastName: string) {
  const name = [firstName, lastName].filter(Boolean).join(" ") || "Utilisateur";
  const encoded = encodeURIComponent(name);
  return `https://dummyjson.com/image/128x128/008080/ffffff?text=${encoded}&fontFamily=ubuntu&fontSize=24&type=png`;
}
