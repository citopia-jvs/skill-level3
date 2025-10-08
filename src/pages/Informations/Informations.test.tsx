import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom/jest-globals';
import { beforeEach, expect, test } from '@jest/globals';

import { Informations } from "./Informations";
import { useUserStore } from "../../store/userStore";

beforeEach(() => {
    localStorage.clear();
    useUserStore.setState({ firstName: "", name: "", birthDate: "" });
});

test("store is updated when user enters inputs", async () => {
    const user = userEvent.setup();
    render(<Informations />);

    const nom = screen.getByLabelText(/^nom/i) as HTMLInputElement;
    const prenom = screen.getByLabelText(/^prénom/i) as HTMLInputElement;
    const date = screen.getByLabelText(/^date de naissance/i) as HTMLInputElement;

    await user.clear(nom);    await user.type(nom, "Mourabit");
    await user.clear(prenom); await user.type(prenom, "Nassim");
    await user.clear(date);   await user.type(date, "1998-10-14");

    // Right values in the inputs
    expect(nom.value).toBe("Mourabit");
    expect(prenom.value).toBe("Nassim");
    expect(date.value).toBe("1998-10-14");

    // Stores is updated
    const state = useUserStore.getState();
    expect(state.name).toBe("Mourabit");
    expect(state.firstName).toBe("Nassim");
    expect(state.birthDate).toBe("1998-10-14");
});
