import { WEATHER_API_KEY } from 'react-native-dotenv';

export const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?appid=${WEATHER_API_KEY}`;
export const FORECAST_API = `http://api.openweathermap.org/data/2.5/forecast?appid=${WEATHER_API_KEY}`;
