import { useUserStore } from '../../store/userStore'
import React from 'react'
import './Informations.css'

export const Informations: React.FC = () => {
    const { name, firstName, birthDate, setName, setFirstName, setBirthDate } = useUserStore()

    return (
      // Form to update the user information in the store
      <form>
        <div>
        <label> Nom: </label>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label> Prénom: </label>
        <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label> Date de naissance: </label>
        <input type="date" name="birthDate" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
      </form>
    )
}
