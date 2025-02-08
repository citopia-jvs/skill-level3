import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "@/store/store";
import { updateUserInfo } from "@/features/user/userSlice";
import "../styles/Birthday.css";
import { UserState } from "@/types/user.types";// Ensure the path is correct

const Informations: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Assign undefined instead of null if the input is empty
        if (!value) {
            dispatch(updateUserInfo({ [name]: undefined } as Partial<UserState>));
        } else {
            dispatch(updateUserInfo({ [name]: value } as Partial<UserState>));
        }
    };

    return (
        <div className="birthday-container">
            <Link to="/" className="top-right-link">Retour aux vœux</Link>

            <div className="title">Informations Personnelles</div>

            <div className="container">
                <form className="form-container">
                    <div className="form-group">
                        <label htmlFor="lastName">Nom</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={user.lastName || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Votre nom"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstName">Prénom</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={user.firstName || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Votre prénom"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="birthDate">Date de naissance</label>
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={user.birthDate || ''}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="avatarUrl">Avatar URL</label>
                        <input
                            type="text"
                            id="avatarUrl"
                            name="avatarUrl"
                            value={user.avatarUrl || ''}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="URL de votre avatar"
                        />
                    </div>
                </form>

                {/* Display avatar if avatarUrl exists */}
                {user.avatarUrl ? (
                    <div className="avatar-container">
                        <img src={user.avatarUrl} alt="User Avatar" className="avatar-image" />
                    </div>
                ) : (
                    <p>Aucun avatar disponible.</p>
                )}
            </div>
        </div>
    );
};

export default Informations;