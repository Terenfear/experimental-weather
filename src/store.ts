import { configureStore } from '@reduxjs/toolkit'
import { apiMiddleware } from 'redux-api-middleware'
import createSagaMiddleware from 'redux-saga'
import { backendSaga } from './backendSaga'
import rootReducer from './rootReducer'

const sagaMiddleware = createSagaMiddleware()

export default function configureAppStore() {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [apiMiddleware, sagaMiddleware]
    })
    sagaMiddleware.run(backendSaga)
    if (process.env.NODE_ENV !== 'production' && module.hot) {
        module.hot.accept('./rootReducer', () => store.replaceReducer(rootReducer))
    }
    return store
}

export type RootState = ReturnType<ReturnType<typeof configureAppStore>['getState']>
