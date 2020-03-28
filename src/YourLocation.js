import React, { useState, useEffect } from 'react'
import GetLocation from 'react-native-get-location'
import Weather from './Weather';
import { WEATHER_API, FORECAST_API } from './constants/Constants';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import Forecast from './Forecast';
import SplashScreen from 'react-native-splash-screen'

export default function YourLocation({ selectedIndex }) {
    const [weather, setWeather] = useState({})
    const [forecast, setForecast] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000
        }).then(async location => {
            try {
                await Promise.all([
                    fetch(WEATHER_API + `&lat=${location.latitude}&lon=${location.longitude}`, {
                        method: 'GET',
                        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
                    }
                    )
                        .then(response => response.json())
                        .catch(err => alert(err))
                    , fetch(FORECAST_API + `&lat=${location.latitude}&lon=${location.longitude}`, {
                        method: 'GET',
                        headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
                    })
                        .then(response => response.json())
                        .catch(err => alert(err))
                ])
                    .then(data => {
                        setWeather(data[0])
                        setForecast(data[1])
                        setIsLoading(false)
                    })
            }
            catch (err) {
                alert(err)
            }
        })
        SplashScreen.hide();
    }, [])
    return (
        <View style={styles.root}>
            <Text style={styles.text}>CURRENT LOCATION</Text>
            {!selectedIndex ? (isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Weather weather={weather} />)
                : (isLoading ? <ActivityIndicator size="large" color="#fff" /> : <Forecast forecast={forecast} marginTop={13} />)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        marginTop: 30
    },
    text: {
        fontSize: 17,
        color: 'white',
        marginLeft: 15,
        marginBottom: 10,
        marginTop: 19
    }
})