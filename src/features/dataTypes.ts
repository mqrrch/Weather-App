export interface Root {
  location: Location
  current: Current
  forecast: Forecast
}

export interface Location {
  name: string
  region: string
  country: string
  localtime: string
}

export interface Current {
  last_updated: string
  temp_c: number
  temp_f: number
  condition: Condition
}

export interface Condition {
  text: string
  icon: string
}

export interface Forecast {
  forecastday: Forecastday[]
}

export interface Forecastday {
  date: string
  day: Day
  astro: Astro
  hour: Hour[]
}
export interface Day {
  daily_chance_of_rain: number
  daily_chance_of_snow: number
  condition: Condition
  uv: number
}

export interface Astro {
  sunrise: string
  sunset: string
  moonrise: string
  moonset: string
  moon_phase: string
}

export interface Hour {
  time: string
  temp_c: number
  temp_f: number
  condition: Condition
  wind_mph: number
  wind_kph: number
  wind_dir: string
  humidity: number
  cloud: number
  chance_of_rain: number
  chance_of_snow: number
  uv: number
}

// Big thanks to https://transform.tools/json-to-typescript