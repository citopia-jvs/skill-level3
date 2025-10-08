import { useUserStore } from '../../store/userStore'
import React from 'react'
import './Informations.css'

export const Informations: React.FC = () => {
    const { name, firstName, birthDate, setName, setFirstName, setBirthDate } = useUserStore()

    return (
      // Form to update the user information in the store
      <form>
        <div>
        <label htmlFor="name"> Nom: </label>
        <input type="text" id='name' name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="firstName"> Prénom: </label>
        <input type="text" id='firstName' name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="birthDate"> Date de naissance: </label>
        <input type="date" id='birthDate' name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
      </form>
    )
}
