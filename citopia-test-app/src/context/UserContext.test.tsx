import { renderHook, act } from "@testing-library/react";
import { UserProvider } from "./UserProvider";
import { UserContext } from "./UserContext";
import { useContext } from "react";

/**
 * Tests unitaires de UserContext
 * Ce fichier vérifie que les valeurs par défaut sont correctes
 * et que la fonction setUser met à jour l'état du contexte.
 */
describe("UserContext", () => {
  test("read and update user values", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <UserProvider>{children}</UserProvider>
    );

    const { result } = renderHook(() => useContext(UserContext), { wrapper });

    expect(result.current?.user.lastName).toBe("");
    expect(result.current?.user.firstName).toBe("");

    act(() => {
      result.current?.setUser({
        lastName: "Doe",
        firstName: "John",
        birthDate: "1983-06-05",
      });
    });

    expect(result.current?.user.lastName).toBe("Doe");
    expect(result.current?.user.firstName).toBe("John");
    expect(result.current?.user.birthDate).toBe("1983-06-05");
  });
});