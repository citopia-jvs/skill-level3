/**
 * Récupère les données météo depuis l'API Open-Meteo.
 * @param latitude Latitude de la localisation
 * @param longitude Longitude de la localisation
 * @returns Un objet contenant la température actuelle et le code météo
 */
export async function fetchWeather(latitude: number, longitude: number) {
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!res.ok) {
        throw new Error("Erreur de récupération météo");
    }

    const data = await res.json();

    return data.current_weather;
}


/**
 * Cette fonction retourne une description et un emoji qui correspondent à un code météo
 * @param code code météo
 * @returns une map avec les différents code météo
 */
export function getWeatherDescription(code: number): string {
  const map: Record<number, string> = {
    0: "☀️ Ciel clair",
    1: "🌤️ Partiellement nuageux",
    2: "🌥️ Nuageux",
    3: "☁️ Couvert",
    45: "🌫️ Brouillard",
    48: "🌫️🌫️ Brouillard givrant",
    51: "🌦️ Bruine légère",
    61: "🌧️ Pluie faible",
    63: "🌧️🌧️ Pluie modérée",
    65: "🌧️🌧️🌧️ Pluie forte",
    71: "❄️ Neige faible",
    75: "❄️❄️❄️ Neige forte",
    95: "⛈️ Orage"
  };
  return map[code] || "🌈 Temps inconnu";
}

