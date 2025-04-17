import useStore, { User } from '../index';

describe('Store', () => {
    // Réinitialiser le store avant chaque test
    beforeEach(() => {
        const storeUser = useStore.getState().setUser;
        storeUser(null);
    });
  
    test('Initialisation du store avec un user null', () => {
        const user = useStore.getState().user;
        expect(user).toBeNull();
    });
  
    test("Mise à jour de l'utilisateur dans le store", () => {
        // Utilisateur de test
        const testUser: User = {
        firstname: 'John',
        lastname: 'Doe',
        birthday: new Date('1990-01-01')
        };

        // Enregistrement de l'utilisateur dans le store
        useStore.getState().setUser(testUser);

        // Vérification de l'état du store
        const updatedUser = useStore.getState().user;
        expect(updatedUser).toEqual(testUser);
        expect(updatedUser?.firstname).toBe('John');
        expect(updatedUser?.lastname).toBe('Doe');
        expect(updatedUser?.birthday).toEqual(new Date('1990-01-01'));
    });
});