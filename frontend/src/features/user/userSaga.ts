import { takeEvery, put, call } from 'redux-saga/effects';
import { updateUserInfo } from './userSlice'; // Replace with correct import path

// Define the shape of your expected JSON data
interface UserData {
    firstName: string;
    lastName: string;
    birthDate: string;
    avatarUrl: string;
}

// Worker Saga
function* fetchUserData() {
    try {
// Because redux-saga's 'call(...)' returns 'unknown' in TypeScript,
// explicitly cast the result as a Response.
        const response = (yield call(fetch, 'https://dummyjson.com/users')) as Response;

// Check if the response is OK (status range 200–299).
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

// Wait for the response to convert to JSON. Cast the resolved value to UserData.
        const data = (yield call([response, response.json])) as UserData;

// Dispatch an action to update your Redux store with the new user info
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

// Watcher Saga
function* watchUserData() {
    yield takeEvery('FETCH_USER', fetchUserData);
}
    export default watchUserData;