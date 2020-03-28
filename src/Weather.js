import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Divider } from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Weather({ weather , marginTop }) {
    const date = new Date(weather.dt * 1000)
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : "" + date.getMinutes()
    const hours = date.getHours() < 10 ? "0" + date.getHours() : "" + date.getHours()
    const time = date.toDateString()

    return (
        <View style={{...styles.root,marginTop : marginTop}}>
            {weather.cod === 200 ?
                (
                    <>
                        <Text style={styles.name}>{weather.name},{weather.sys.country}</Text>
                        <Text style={styles.coord}>lat: {weather.coord.lat}, long: {weather.coord.lon}</Text>
                        <View style={styles.container}>
                            <View style={styles.main}>
                                <View style={styles.main1}>
                                    <Text style={styles.mainDegree}>{(weather.main.temp - 273.15).toFixed(2)}{'\u00b0'}</Text>
                                    <View style={styles.image}>
                                        <Image source={{ uri: `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png` }} style={styles.icon} />
                                    </View>
                                </View>

                                <View style={styles.main2}>
                                    <Text style={styles.description}>{weather.weather[0].description.toUpperCase()}</Text>
                                    <View style={styles.degrees}>
                                        <Text style={styles.minDegree}><AntdesignIcon name="arrowdown" size={0.05*width} color="white" />{(weather.main.temp_min - 273.15).toFixed(2)}{'\u00b0'}</Text>
                                        <Text style={styles.maxDegree}><AntdesignIcon name="arrowup" size={0.05*width} color="white" />{(weather.main.temp_max - 273.15).toFixed(2)}{'\u00b0'}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.time}>
                                <AntdesignIcon name="clockcircleo" size={0.05*width} color="white" />
                                <Text style={styles.timeText}>{time} / {`${hours}:${minutes}`}</Text>
                            </View>
                        </View>
                        <Text style={styles.detailTitle}>DETAIL</Text>
                        <View style={styles.detailContainer}>
                            <ScrollView style={styles.scroller}>
                                <View style={styles.detail}>
                                    <EntypoIcon name="yelp" size={0.07*width} color="white" />
                                    <Text style={styles.attributes}>Pressure</Text>
                                    <Text style={styles.attrValue}>{(weather.main.pressure)}hPa</Text>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.detail}>
                                    <EntypoIcon name="water" size={0.07*width} color="white" />
                                    <Text style={styles.attributes}>Humidity</Text>
                                    <Text style={styles.attrValue}>{(weather.main.humidity)}%</Text>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.detail}>
                                    <FontistoIcon name="wind" size={0.07*width} color="white" />
                                    <Text style={styles.attributes}>Wind speed</Text>
                                    <Text style={styles.attrValue}>{weather.wind.speed}m/s</Text>
                                </View>
                                <Divider style={styles.divider} />
                                <View style={styles.detail}>
                                    <MaterialCIcon name="weather-windy-variant" size={0.07*width} color="white" />
                                    <Text style={styles.attributes}>Wind direction</Text>
                                    <Text style={styles.attrValue}>{weather.wind.deg}{'\u00b0'}</Text>
                                </View>
                                {weather.visibility ?
                                    <>
                                        <Divider style={styles.divider} />
                                        <View style={styles.detail}>
                                            <MaterialIcon name="visibility" size={0.07*width} color="white" />
                                            <Text style={styles.attributes}>Visibility</Text>
                                            <Text style={styles.attrValue}>{(weather.visibility / 1000).toFixed(2)} km</Text>
                                        </View>
                                    </> : null}
                                {weather.clouds ?
                                    <>
                                        <Divider style={styles.divider} />
                                        <View style={styles.detail}>
                                            <EntypoIcon name="cloud" size={0.07*width} color="white" />
                                            <Text style={styles.attributes}>Cloud cover</Text>
                                            <Text style={styles.attrValue}>{weather.clouds.all}%</Text>
                                        </View>
                                    </> : null}
                                {weather.rain ?
                                    <>
                                        <Divider style={styles.divider} />
                                        <View style={styles.detail}>
                                            <FontistoIcon name="rain" size={0.07*width} color="white" />
                                            <Text style={styles.attributes}>Rain</Text>
                                            <Text style={styles.attrValue}>{weather.rain['3h']}mm/3hours</Text>
                                        </View>
                                    </> : null}
                                {weather.snow ?
                                    <>
                                        <Divider style={styles.divider} />
                                        <View style={styles.detail}>
                                            <FontistoIcon name="snowflake-6" size={0.07*width} color="white" />
                                            <Text style={styles.attributes}>Snow</Text>
                                            <Text style={styles.attrValue}>{weather.snow['3h']}mm/3hours</Text>
                                        </View>
                                    </> : null}
                            </ScrollView>
                        </View>
                    </>
                ) : (<Text>{weather.message}</Text>)
            }
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        width: width,
        height: height
    },
    container: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        width: '93%',
    },
    name: {
        fontSize: 0.08*width,
        fontWeight: 'bold',
        color: 'white'
    },
    coord: {
        fontSize: 0.04*width,
        color: 'white'
    },
    main: {
        width: '100%'
    },
    main1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    mainDegree: {
        fontSize: 0.13*width, color: 'white',
        flex: 1,
        textAlign: 'center',
    },
    image: { flex: 1, alignItems: 'center' },
    icon: {
        width: 0.4*width,
        height: 0.2*height,
    },
    main2: {
        flexDirection: 'row',
        marginTop: -0.01*height,
        width: '100%',
    },
    description: { color: 'white', fontSize: 0.043*width, flex: 1, textAlign: 'center' },
    degrees: { flexDirection: 'row', flex: 1 },
    minDegree: {
        color: 'white',
        fontSize: 0.043*width,
        flex: 1,
        textAlign: 'center',
        paddingLeft: 0.05*width
    },
    maxDegree: {
        color: 'white',
        fontSize: 0.043*width,
        flex: 1,
        textAlign: 'center',
        paddingRight: 0.05*width
    },
    time: {
        flexDirection: 'row',
        margin: 0.015*height,
        alignItems: 'center',
    },
    timeText: {
        marginLeft: 0.01*width,
        fontSize: 0.04*width,
        color: 'white'
    },
    detailTitle: {
        fontSize: 0.06*width,
        color: 'white',
        alignSelf: 'flex-start',
        marginVertical: 0.012*height,
        marginLeft: 0.035*width
    },
    detailContainer: { backgroundColor: 'rgba(255,255,255,0.2)', width: '93%', flex: 1 , marginBottom :0.13*height},
    scroller: { width: '100%' },
    detail: { flexDirection: 'row', height: 0.09*height, padding: 0.01*height, alignItems: 'center' },
    attributes: {
        color: 'white', fontSize: 0.043*width, flexGrow: 1, marginLeft: 0.035*width
    },
    attrValue: { color: 'white', fontSize: 0.043*width },
    divider: {
        backgroundColor: 'white',
        width: '95%',
        marginLeft: '2.5%',
        marginRight: '2.5%'
    }
})