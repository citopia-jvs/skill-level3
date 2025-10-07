import { Component } from 'react'

export default class Informations extends Component {
  render() {
    return (
      <form>
        <label> Nom: </label>
        <input type="text" name="name" />
        <label> Prénom: </label>
        <input type="text" name="firstName" />
        <label> Date de naissance: </label>
        <input type="date" name="birthDate" />
      </form>
    )
  }
}
