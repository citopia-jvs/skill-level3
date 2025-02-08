import { call, put, takeLatest } from "redux-saga/effects";
import { fetchUser } from "../../../api/userService";
import { updateUser } from "../store/userSlice";

function* fetchUserSaga() {
    try {
        const user = yield call(fetchUser);
        yield put(updateUser(user));
    } catch (error) {
        console.error("Failed to fetch user", error);
    }
}

export function* userSaga() {
    yield takeLatest("user/fetchUserRequest", fetchUserSaga);
}
