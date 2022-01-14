import { Button } from '@mui/material'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CurrentWeather from './CurrentWeather'
import { getCurrentWeather, selectCurrentWeather } from './weatherSlice'

const Weather: React.FC = () => {
    const currentWeather = useSelector(selectCurrentWeather)
    const dispatch = useDispatch()
    const requestCurrentWeather = useCallback(() => dispatch(getCurrentWeather()), [])
    return (
        currentWeather ?
            <CurrentWeather location={currentWeather.location}
                weather={currentWeather.current} />
            : <Button
                sx={{ marginX: 'auto', display: 'block' }}
                onClick={requestCurrentWeather}>
                Load current weather
            </Button>
    )
}

export default Weather
