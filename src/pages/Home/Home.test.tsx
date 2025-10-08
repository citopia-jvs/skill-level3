import { render, screen } from '@testing-library/react';
import '@testing-library/dom';
import '@testing-library/jest-dom/jest-globals';
import { beforeEach, expect, jest, test } from '@jest/globals';
import { Home } from "./Home";
import { useUserStore } from "../../store/userStore";

beforeEach(() => {
    localStorage.clear();
    useUserStore.setState({ firstName: "", name: "", birthDate: "" });
    globalThis.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
});

test("if name or firstname is missing, show instruction message", () => {
    render(<Home />);
    expect(
        screen.getByText(/Veuillez renseigner votre nom et prénom\./i)
    ).toBeInTheDocument();
});

test("if date is missing, show instruction message", () => {
    useUserStore.setState({ firstName: "Nassim", name: "Mourabit" });

    (globalThis.fetch as unknown as jest.MockedFunction<typeof fetch>) = jest.fn();
    const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValue({ ok: true, url: 'about:blank' } as unknown as Response);

    render(<Home />);
    expect(
        screen.getByText(/Veuillez renseigner votre date de naissance\./i)
    ).toBeInTheDocument();
});

test("if name/firstname + date are present, show DummyJSON image and birthday message", async () => {
    const firstName = "Nassim";
    const name = "Mourabit";

    const t = new Date();
    t.setDate(t.getDate() + 1);
    const birthDate = `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(
        t.getDate()
    ).padStart(2, "0")}`;

    useUserStore.setState({ firstName, name, birthDate });

    const encoded = encodeURIComponent(`Bonjour ${firstName} ${name} !`);
    const dummyUrl = `https://dummyjson.com/image/600x200/101E35/00CCFF?text=${encoded}&fontSize=26`;
    const mockFetch = globalThis.fetch as jest.MockedFunction<typeof fetch>;
    mockFetch.mockResolvedValue({ ok: true, url: dummyUrl } as unknown as Response);

    render(<Home />);

    // Is the image shown with the correct src
    const img = await screen.findByRole("img", { name: /user dummy/i });
    expect(img).toBeInTheDocument();
    expect((img as HTMLImageElement).src).toContain(
        encodeURIComponent(`Bonjour ${firstName} ${name} !`)
    );

    // Check the birthday message is correct
    expect(
        screen.getByText(/Il reste\.\.\..*avant votre anniversaire !/i)
    ).toBeInTheDocument();
});