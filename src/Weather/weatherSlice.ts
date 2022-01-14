import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BackendCurrentWeather } from '../backendTypes'

const initialState = null as BackendCurrentWeather | null

const name = 'weather'
const weatherSlice = createSlice({
    name,
    initialState,
    reducers: {
        hydrate: (_, action: PayloadAction<BackendCurrentWeather>) => action.payload
    }
})

type RootState = {
    [name]: BackendCurrentWeather | undefined
}

export const { hydrate } = weatherSlice.actions
export const getCurrentWeather = createAction('GET_CURRENT_WEATHER')
export const reducer = weatherSlice.reducer
export const selectCurrentWeather = (rootState: RootState) => rootState[name]
export const weatherNamedReducer = { [name]: reducer }
