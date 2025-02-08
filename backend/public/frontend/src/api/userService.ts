export const fetchUser = async () => {
    const response = await fetch("https://dummyjson.com/users/1");
    return response.json();
};
