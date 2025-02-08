import { Link } from "react-router-dom";
import { useUserProvider } from "../provider/UserContext";
import { useUsersInformation } from "../hooks/useUsersInformation";
import { useEffect } from "react";

const Home: React.FC = () => {
    const { user, handleUserInformation } = useUserProvider();

    const { data, isLoading, isError } = useUsersInformation(
        user?.firstName || "",
        user?.lastName || ""
    );

    useEffect(() => {
        const res = data?.filter(
            (u) =>
                u?.firstName
                    ?.toLowerCase()
                    .includes(user?.firstName?.toLowerCase() ?? "") &&
                u?.lastName
                    ?.toLowerCase()
                    .includes(user?.lastName?.toLowerCase() ?? "")
        );

        if (res?.[0]?.image && res[0].image !== user?.image) {
            handleUserInformation({ image: res[0].image });
        }
    }, [data, user, handleUserInformation]);

    const calculateNextBirthday = () => {
        const birthDate = user?.birthDate;
        const today = new Date();

        let nextBirthday;

        if (birthDate) {
            const [_, month, day] = birthDate.split("-").map(Number);
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
            ) : user ? (
                <>
                    <h1 className="text-2xl font-bold">
                        Bonjour {user?.firstName}
                    </h1>
                    {user?.birthDate ? (
                        calculateNextBirthday()
                    ) : (
                        <Link
                            className="rounded-full bg-indigo-500 p-3 text-white"
                            to="/information"
                        >
                            Ajouter votre date d'anniversaire
                        </Link>
                    )}
                    {user?.image && <img src={user?.image} alt="img" />}
                </>
            ) : (
                <Link
                    className="rounded-full bg-indigo-500 p-3 text-white"
                    to="/information"
                >
                    Cliquer ici pour remplir le formulaire
                </Link>
            )}
        </div>
    );
};

export default Home;
