import { call, Effect, put, takeEvery } from 'redux-saga/effects';
// import { FETCH_DATA_REQUEST, fetchDataSuccess, fetchDataFailure } from './actions';
import { fetchDataRequest, fetchDataSuccess, fetchDataFailure } from './slices/dataSlice';
import { store } from './store';
import { FormData } from '../types';

// Fonction qui fait l'appel API
const fetchDataFromApi = (userData: FormData) =>
  fetch(`https://dummyjson.com/image/400x200?type=webp&text=Bienvenue ${userData.prenom} ${userData.nom} !`)
    .then((response) => response.blob())
    .then((blob) => URL.createObjectURL(blob));

// Saga principale
function* fetchDataSaga(): Generator<Effect, void, unknown> {
  const user = store.getState().user;
  try {
    const response = yield call(() => fetchDataFromApi(user)); // Appel API
    yield put(fetchDataSuccess(response)); // Dispatch action de succès
  } catch (error: unknown) {
    yield put(fetchDataFailure(error instanceof Error || true)); // Dispatch action d'erreur
  }
}

// Watcher Saga : surveille les actions FETCH_DATA_REQUEST
function* watchFetchData() {
  yield takeEvery(fetchDataRequest.type, fetchDataSaga);
}

export default watchFetchData;
