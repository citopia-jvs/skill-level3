import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {AppDispatch, RootState} from "../store/store";
import { updateUserInfo } from "../features/user/userSlice";
import "../styles/Birthday.css";
import {UserState} from "@/types/user.types.ts";

const Informations: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>(); // ✅ Correct dispatch type
    const user = useSelector((state: RootState) => state.user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(updateUserInfo({ [name]: value } as Partial<UserState>)); // ✅ Fix typing
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
                            value={user.lastName}
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
                            value={user.firstName}
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
                            value={user.birthDate}
                            onChange={handleChange}
                            className="input-field"
                        />
                    </div>
                </form>

                {/* ✅ Ensure avatar is displayed */}
                {user.avatarUrl ? (
                    <div className="avatar-container">
                        <img src={user.avatarUrl} alt="User Avatar" className="avatar-image" />
                    </div>
                ) : (
                    <p>Loading avatar...</p> // Show a loading state instead of disappearing
                )}
            </div>
        </div>
    );
};

export default Informations;
