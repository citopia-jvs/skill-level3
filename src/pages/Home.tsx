import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserProvider } from "../provider/UserContext";
import { useUsersInformation } from "../hooks/useUsersInformation";

const Home: React.FC = () => {
    const { user, handleUserInformation } = useUserProvider();

    const { data, isLoading, isError } = useUsersInformation(
        user?.firstName || "",
        user?.lastName || ""
    );

    useEffect(() => {
        const res = data?.filter(
            (u) =>
                u?.firstName?.toLowerCase() ===
                    user?.firstName?.toLowerCase() &&
                u?.lastName?.toLowerCase() === user?.lastName?.toLowerCase()
        );

        if (
            res?.length === 1 &&
            res?.[0]?.image &&
            res[0].image !== user?.image
        ) {
            handleUserInformation({ image: res[0].image });
        } else if (res?.length === 0 && user?.image)
            handleUserInformation({ image: "" });
    }, [data, user, handleUserInformation]);

    const calculateNextBirthday = () => {
        const birthDate = user?.birthDate;
        const today = new Date();

        let nextBirthday;

        if (birthDate) {
            const [, month, day] = birthDate.split("-").map(Number);
            let birthday = new Date(today.getFullYear(), month - 1, day);

            if (birthday <= today) {
                birthday.setFullYear(today.getFullYear() + 1);
            }

            const diffTime = birthday.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (
                birthday.getDate() === today.getDate() &&
                birthday.getMonth() === today.getMonth()
            ) {
                nextBirthday = (
                    <p className="text-center">
                        Votre anniversaire est aujourd'hui
                        <br />
                        <span className="text-indigo-500 text-3xl font-bold">
                            JOYEUX ANNIVERSAIRE !
                        </span>
                    </p>
                );
            } else {
                nextBirthday = (
                    <p className="text-center">
                        Votre anniversaire est dans
                        <br />
                        <span className="text-indigo-500 text-3xl font-bold">
                            {diffDays} jours
                        </span>
                    </p>
                );
            }

            return nextBirthday;
        }
    };

    return (
        <div className="flex flex-col items-center gap-12">
            {isLoading ? (
                <div className="loader">En cours de chargement...</div>
            ) : isError ? (
                <div>Une erreur s'est produite</div>
            ) : user?.firstName && user?.lastName ? (
                <>
                    <h1 className="text-2xl font-light">
                        Bonjour {user?.firstName}
                    </h1>
                    {user?.birthDate ? (
                        calculateNextBirthday()
                    ) : (
                        <Link
                            className="rounded-full bg-indigo-500 p-3 text-white hover:bg-indigo-700"
                            to="/information"
                        >
                            Ajouter la date de naissance
                        </Link>
                    )}
                    {user?.image && <img src={user?.image} alt="img" />}
                </>
            ) : (
                <Link
                    className="rounded-full bg-indigo-500 p-3 text-white"
                    to="/information"
                >
                    Remplir le formulaire
                </Link>
            )}
        </div>
    );
};

export default Home;
