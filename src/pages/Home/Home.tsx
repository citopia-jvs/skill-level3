import { useUserStore } from "../../store/userStore";
import React, { useEffect, useState } from "react";
import { daysLeft } from "../../utils/date";
import './Home.css'

export const Home: React.FC = () => {
    const { name, firstName, birthDate } = useUserStore(); // User info from store
    const [imgDummy, setImgDummy] = useState<string | null>(null); // Image src from dummyjson
    const days = daysLeft(birthDate); // Calculate days left untill birthday

    // Fetch the image from dummyjson
    useEffect(() => {
        if (!name || !firstName) return;
        const encodedName = encodeURIComponent(`Bonjour ${firstName} ${name} !`);
        const url = `https://dummyjson.com/image/600x200/101E35/00CCFF?text=${encodedName}&fontSize=26`;

        fetch(url)
            .then(response => {
                if (response.ok) {
                    setImgDummy(response.url);
                }
            });
    }, [firstName, name]);

    return (
    <section className="home">
        <div className="dummy-image">
        {imgDummy ? <img src={imgDummy} alt="User Dummy" /> : <p> Veuillez renseigner votre nom et prénom.</p>}
        </div>
        <div className="birthday-info">
        {birthDate ? <p>Il reste... {days} jour{days > 1 ? 's' : ''} avant votre anniversaire !</p> : <p>Veuillez renseigner votre date de naissance.</p>}
        </div>
    </section>
    );
}
