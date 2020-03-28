import React, { useState } from 'react';
import { SearchBar, ButtonGroup } from 'react-native-elements';
import { Text, StyleSheet, View , ActivityIndicator , Dimensions } from 'react-native';
import { WEATHER_API, FORECAST_API } from './constants/Constants';
import Weather from './Weather';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import Forecast from './Forecast';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Search({ selectedIndex, setSelectedIndex }) {
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [weather, setWeather] = useState({})
    const [forecast, setForecast] = useState({})
    const [isFocus, setIsFocus] = useState(false)
    const buttons = ['Temp', 'Forecast']
    const fetchData = async search => {
        setIsLoading(true)
        try {
            await Promise.all([
                fetch(WEATHER_API + `&q=${search}`, {
                    method: 'GET',
                    headers: { Accept: 'application/json', 'Content-Type': 'application/json' }
                }
                )
                    .then(response => response.json())
                    .catch(err => alert(err))
                , fetch(FORECAST_API + `&q=${search}`, {
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
    }

    return (
        <>
            <View style={styles.bar}>
                <SearchBar
                    placeholder="Enter some city name..."
                    value={search}
                    onChangeText={setSearch}
                    containerStyle={{ marginTop: 0.05*height, borderBottomColor: 'transparent', borderTopColor: 'transparent', backgroundColor: 'transparent', flexGrow: 1 }}
                    inputContainerStyle={{ width: isFocus ? '100%' : 0.13*width, borderRadius: 0.06*width, height: 0.07*height, backgroundColor: 'rgba(0,0,0,0.2)' }}
                    searchIcon={<AntdesignIcon color="white" size={0.06*width} name="search1" style={{ marginLeft: 0.015*width }} onPress={() => setIsFocus(true)} />}
                    inputStyle={{ width: 0, color: 'white' }}
                    onBlur={() => setIsFocus(false)}
                    round
                    lightTheme={false}
                    onEndEditing={() => {
                        if (search) {
                            fetchData(search)
                            setSearch("")
                        }
                    }}
                    showLoading={isLoading}
                />
                <ButtonGroup buttons={buttons}
                    selectedIndex={selectedIndex}
                    onPress={setSelectedIndex}
                    containerStyle={{ width: 0.32*width, backgroundColor: 'transparent', borderRadius: 0.02*width, marginBottom: 0.02*height, borderColor: 'transparent' }}
                    textStyle={{ color: 'white' }}
                    selectedTextStyle={{ color: 'black' }}
                    selectedButtonStyle={{ backgroundColor: 'rgba(255,255,255,0.7)' }}
                />
            </View>
            {
                !selectedIndex ?
                    (isLoading ? (JSON.stringify(weather) === "{}" ?<ActivityIndicator size="large" color="#fff" />
                        : <Weather weather={weather} marginTop={-0.017*height} />)
                        : (JSON.stringify(weather) === "{}" ? <Text style={styles.code}>Type some location to search data...</Text>
                            : <Weather weather={weather} marginTop={-0.017*height} />))
                    :
                    (isLoading ? (JSON.stringify(forecast) === "{}" ?<ActivityIndicator size="large" color="#fff" />
                        : <Forecast forecast={forecast} />)
                        : (JSON.stringify(forecast) === "{}" ? <Text style={styles.code}>Type some location to search data...</Text>
                            : <Forecast forecast={forecast} />))
            }
        </>
    )
}

const styles = StyleSheet.create({
    code: {
        color: 'white',
        fontSize: 0.05*width,
        textAlign: 'center'
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
})