import { takeEvery, put, call } from 'redux-saga/effects';
import { updateUserInfo } from './userSlice';
import { SagaIterator } from 'redux-saga';

interface UserData {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl: string;
}

export function* fetchUserData(): SagaIterator {
    try {
        const response = (yield call(fetch, 'https://dummyjson.com/users')) as Response;

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = (yield call([response, response.json])) as UserData;

        yield put(
            updateUserInfo({
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: data.birthDate,
                avatarUrl: data.avatarUrl,
            })
        );
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

export function* watchUserData(): SagaIterator {
    yield takeEvery('FETCH_USER', fetchUserData);
}

export default watchUserData;