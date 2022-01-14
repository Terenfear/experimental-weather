import { Stack, styled, Typography } from '@mui/material'
import React from 'react'
import { BackendInnerWeather, BackendLocation } from '../backendTypes'

interface CurrentWeatherProps {
    location: BackendLocation,
    weather: BackendInnerWeather
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ location, weather }) => {
    const { temp_c, condition: { icon, text } } = weather
    return (
        <CenteringStack>
            <img src={icon} alt={text} />
            <Typography>{text}</Typography>
            <Typography variant='h4'>{temp_c}</Typography>
        </CenteringStack>
    )
}

const CenteringStack = styled(Stack)({
    justifyContent: 'center',
    alignItems: 'center',
    spacing: 2
})

export default CurrentWeather
