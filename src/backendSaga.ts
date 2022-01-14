
import { RSAARequestAction, RSAAResultAction } from 'redux-api-middleware'
import { all, fork, call, put, takeLatest, takeEvery, take } from 'redux-saga/effects'
import { GET_WEATHER, GLOBAL_REQUEST_FAILURE_TYPE, GLOBAL_REQUEST_STARTED_TYPE, SUCCESS_GET_WEATHER } from './apiActions'
import { endLoading, resetError, showError, startLoading } from './App/appSlice'
import { BackendCurrentWeather } from './backendTypes'
import { getCurrentWeather, hydrate } from './Weather/weatherSlice'

function* requestCurrentWeather() {
    yield takeLatest(getCurrentWeather.type, function* () {
        yield put(GET_WEATHER)
    })
}

function* processCurrentWeather() {
    yield takeLatest<RSAAResultAction<BackendCurrentWeather>>(SUCCESS_GET_WEATHER, function* (a) {
        if (a.error) {
            yield call(console.error, 'Success saga fired without an actual error, strange. Action: ' + JSON.stringify(a))
        } else {
            yield put(hydrate(a.payload))
            yield put(resetError())
        }
        yield put(endLoading())
    })
}

function* currentWeatherSaga() {
    yield fork(requestCurrentWeather)
    yield fork(processCurrentWeather)
}

function* processStartedRequest(action: RSAARequestAction) {
    if (action.error) {
        yield call(console.error, action.payload)
    } else {
        yield put(startLoading())
    }
}

function* loadingSaga() {
    yield takeLatest<RSAARequestAction>(GLOBAL_REQUEST_STARTED_TYPE, processStartedRequest)
}

function* processFailedRequest(action: RSAAResultAction) {
    if (action.error) {
        yield put(showError(action.payload))
        yield call(console.error, action.payload, `Endpoint: ${(action as any)['meta']}`)
    } else {
        yield call(console.error, 'Error saga fired without an actual error, strange. Action: ' + JSON.stringify(action))
    }
    yield put(endLoading())
}

function* errorSaga() {
    yield takeEvery(GLOBAL_REQUEST_FAILURE_TYPE, processFailedRequest)
}

export function* backendSaga() {
    yield all([currentWeatherSaga(), loadingSaga(), errorSaga()])
}

