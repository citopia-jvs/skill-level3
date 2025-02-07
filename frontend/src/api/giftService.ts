export const fetchGiftSuggestions = async (name: string, birthDate: string) => {
    return fetch(`https://tavily-api.com/gift-suggestions?name=${name}&birthDate=${birthDate}`);
};
