import { combineReducers } from '@reduxjs/toolkit'
import { appNamedReducer } from './App/appSlice'
import { weatherNamedReducer } from './Weather/weatherSlice'

export default combineReducers({
    ...appNamedReducer,
    ...weatherNamedReducer
})
