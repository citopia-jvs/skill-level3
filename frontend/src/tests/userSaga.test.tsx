import { runSaga } from 'redux-saga';
import { AnyAction } from 'redux';
import { fetchUserData } from '../features/user/userSaga';
import { updateUserInfo } from '../features/user/userSlice';
import { SagaIterator } from 'redux-saga';

describe('fetchUserData Saga', () => {
    it('should fetch user data and dispatch updateUserInfo', async () => {
        const dispatchedActions: Array<ReturnType<typeof updateUserInfo>> = [];

        const fakeData = {
            firstName: 'John',
            lastName: 'Doe',
            birthDate: '1990-01-01',
            avatarUrl: 'http://example.com/avatar.png',
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(fakeData),
            })
        ) as jest.Mock;

        const dispatch = (action: AnyAction) => {
            dispatchedActions.push(action as ReturnType<typeof updateUserInfo>);
            return action;
        };

        // Wrap fetchUserData in a function that returns SagaIterator
        const wrappedSaga = (): SagaIterator => fetchUserData();

        await runSaga({ dispatch }, wrappedSaga).toPromise();

        expect(dispatchedActions).toContainEqual(
            updateUserInfo({
                firstName: fakeData.firstName,
                lastName: fakeData.lastName,
                birthDate: fakeData.birthDate,
                avatarUrl: fakeData.avatarUrl,
            })
        );
    });
});