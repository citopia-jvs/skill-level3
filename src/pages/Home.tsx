import { useUserStore } from "../store/userStore";
import React, { useEffect, useState } from "react";

export const Home: React.FC = () => {
    const { name, firstName } = useUserStore(); // User info from store
    const [imgDummy, setImgDummy] = useState<string | null>(null); // Image src from dummyjson

    // Fetch the image from dummyjson
    useEffect(() => {
        if (!name || !firstName) return;
        const encodedName = encodeURIComponent(`Bonjour ${firstName} ${name} !`);
        const url = `https://dummyjson.com/image/600x200/FF426D/ffffff?text=${encodedName}`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    setImgDummy(response.url);
                }
            });
    }, [firstName, name]);

    return (
    <div>
        {imgDummy ? <img src={imgDummy} alt="User Dummy" /> : <p> Veuillez renseigner vos informations.</p>}
    </div>
    );
}
