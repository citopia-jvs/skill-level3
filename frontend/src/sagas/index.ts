import { all, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import { updateUser, fetchUserRequest } from "../features/user/userSlice.ts";

function* fetchUserData() {
    try {
        const response = yield call(axios.get, "https://dummyjson.com/users/1");
        yield put(updateUser(response.data));
    } catch (error) {
        console.error("Error fetching user data:", error);
    }
}

export default function* rootSaga() {
    yield all([takeLatest(fetchUserRequest.type, fetchUserData)]);
}
