export type BackendLocation = {
    lat: number,
    long: number,
    name?: string
    localtime?: string
}

export type BackendInnerWeather = {
    last_updated: string,
    temp_c: number,
    is_day: number,
    condition: {
        text: string,
        icon: string
    }
}

export type BackendCurrentWeather = {
    location: BackendLocation,
    current: BackendInnerWeather
}
