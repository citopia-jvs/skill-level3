import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchUserRequest } from "../features/user/store/userSlice";
import calculateDaysUntilBirthday from "../utils/dateUtils";
import Avatar from "../components/Avatar";

const Accueil: React.FC = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        dispatch(fetchUserRequest());
    }, [dispatch]);

    return (
        <div>
            <h1>Bienvenue {user.firstName} {user.lastName}</h1>
            <p>Votre anniversaire est dans {calculateDaysUntilBirthday(user.birthDate)} jours</p>
            <Avatar firstName={user.firstName} lastName={user.lastName} />
        </div>
    );
};

export default Accueil;
