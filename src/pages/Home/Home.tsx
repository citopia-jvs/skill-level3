import { useUserStore } from "../../store/userStore";
import React, { useEffect, useState } from "react";
import { daysLeft, getTimeUntilBirthday } from "../../utils/date";
import './Home.css'
import { Countdown } from "../../components/Countdown";
import "../../components/Countdown.css";

export const Home: React.FC = () => {
    const { name, firstName, birthDate } = useUserStore(); // User info from store
    const [imgDummy, setImgDummy] = useState<string | null>(null); // Image src from dummyjson
    const days = daysLeft(birthDate); // Calculate days left untill birthday
    const [timeLeft, setTimeLeft] = useState(getTimeUntilBirthday(birthDate));

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

    // Update the countdown
    useEffect(() => {
        if (!birthDate) return;

        const interval = setInterval(() => {
        setTimeLeft(getTimeUntilBirthday(birthDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [birthDate]);

    return (
    <section className="home">
        <div className="dummy-image">
        {imgDummy ? <img src={imgDummy} alt="User Dummy" /> : <p> Veuillez renseigner votre nom et prénom.</p>}
        </div>
        <div className="birthday-info">
        {birthDate && timeLeft ? (
            timeLeft.isBirthdayToday ? (
                <p className="birthday-message">Joyeux anniversaire {firstName} !</p>
            ) : (
                <>
                <p className="birthday-message">Il reste... {days} jour{days > 1 ? 's' : ''} avant votre anniversaire !</p>
                <h3>Compteur</h3>
                <Countdown days={timeLeft.days} hours={timeLeft.hours} minutes={timeLeft.minutes} seconds={timeLeft.seconds} />
                </>
            )
        ) : (
            <p>Veuillez renseigner votre date de naissance.</p>
        )}
        </div>
    </section>
    );
}
