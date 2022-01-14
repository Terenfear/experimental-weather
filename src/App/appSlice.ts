import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AppState = {
    isLoading: boolean,
    error: Error | null
}

const initialState: AppState = {
    isLoading: false,
    error: null
}
const name = 'app'

const appSlice = createSlice({
    name,
    initialState,
    reducers: {
        startLoading: (s) => { s.isLoading = true },
        endLoading: (s) => { s.isLoading = false },
        showError: (s, a: PayloadAction<Error>) => { s.error = a.payload },
        resetError: (s) => { s.error = null }
    }
})

type RootState = {
    [name]: AppState
}

export const { startLoading, endLoading, showError, resetError } = appSlice.actions
export const reducer = appSlice.reducer
export const selectIsLoading = (rootState: RootState) => rootState[name].isLoading
export const selectError = (rootState: RootState) => rootState[name].error
export const appNamedReducer = { [name]: reducer }
