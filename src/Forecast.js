import React, { useState } from 'react'
import { View, Text, StyleSheet, Picker, ScrollView, Image, Dimensions } from 'react-native'
import AntdesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function Forecast({ forecast , marginTop }) {
    const times = [forecast.list[0], forecast.list[8], forecast.list[16], forecast.list[24], forecast.list[32]]
    const pickers = times.map(item => {
        let index = item.dt_txt.indexOf(" ")
        return item.dt_txt.substring(0, index)
    })
    const [selectedValue, setSelectedValue] = useState(pickers[0])
    const [selectedIndex, setSelectedIndex] = useState(0)

    return (
        <View style={{...styles.root , marginTop : marginTop}}>
            <View style={styles.header}>
                <View style={styles.title}>
                    <Text style={styles.name}>{forecast.city.name},{forecast.city.country}</Text>
                    <Text style={styles.coord}>lat: {forecast.city.coord.lat}, lon: {forecast.city.coord.lat}</Text>
                </View>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.picker}
                        mode="dropdown"
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectedValue(itemValue)
                            setSelectedIndex(itemIndex)
                        }}
                    >
                        {
                            pickers.map((item, index) =>
                                <Picker.Item key={index} label={item} value={item}></Picker.Item>)
                        }
                    </Picker>
                </View>
            </View>
            <View style={styles.detailContainer}>
                <ScrollView style={styles.scroller}>
                    {
                        [...forecast.list.slice(selectedIndex * 8, (selectedIndex + 1) * 8)].map((item , index) =>
                            <View style={styles.detail} key={index}>
                                <View style={styles.main1}>
                                    <View style={styles.image}>
                                        <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} style={styles.icon} />
                                    </View>
                                    <Text style={styles.mainDegree}>{(item.main.temp - 273.15).toFixed(2)}{'\u00b0'}</Text>
                                </View>
                                <View style={styles.main2}>
                                    <Text style={styles.description}>{item.weather[0].description}</Text>
                                    <View style={styles.degrees}>
                                        <Text style={styles.minDegree}><AntdesignIcon name="arrowdown" size={0.05*width} color="white" />{(item.main.temp_min - 273.15).toFixed(2)}{'\u00b0'}</Text>
                                        <Text style={styles.maxDegree}><AntdesignIcon name="arrowup" size={0.05*width} color="white" />{(item.main.temp_max - 273.15).toFixed(2)}{'\u00b0'}</Text>
                                    </View>
                                </View>
                                <View style={styles.attributes}>
                                    <View style={styles.attribute1}>
                                        <EntypoIcon name="water" size={0.065*width} color="white" />
                                        <Text style={styles.attr}>Humidity: {(item.main.humidity)}%</Text>
                                    </View>
                                    <View style={styles.attribute2}>
                                        <EntypoIcon name="yelp" size={0.065*width} color="white" />
                                        <Text style={styles.attr}>Pressure: {(item.main.pressure)}hPa</Text>
                                    </View>
                                    <View style={styles.attribute3}>
                                        <AntdesignIcon name="clockcircleo" size={0.065*width} color="white" />
                                        <Text style={styles.attr}>{item.dt_txt.substring(item.dt_txt.indexOf(" ") + 1)}</Text>
                                    </View>
                                </View>
                            </View>

                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        width: width,
        height: height,
    },
    header: {
        flexDirection: 'row',
        marginTop: -0.01*height
    },
    title: {
        flexGrow : 1,
        marginLeft : 0.07*width
    },
    name: {
        color: 'white',
        fontSize: 0.07*width,
        textAlign: 'center'
    },
    coord: {
        color: 'white',
        fontSize: 0.035*width,
        textAlign: 'center'
    },
    pickerContainer: {
    },
    picker: {
        width: 0.36*width,
        height: 0.06*height,
        color: 'white',
        alignSelf: 'flex-end',
        justifyContent: 'flex-start'
    },
    detailContainer: {
        width: '93%',
        marginBottom: 0.21*height,
        marginTop: 0.03*height
    },
    scroller: {
        width: '100%',
        height: '100%'
    },
    detail: {
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 0.02*width,
        marginBottom: 0.02*height,
        paddingVertical: 0.02*height
    },
    main1: {
        flexDirection: 'row',
        marginTop: -0.03*height
    },
    image: {
        alignItems: 'center',
        flex: 1
    },
    icon: {
        width: 0.25*width,
        height: 0.13*height
    },
    mainDegree: {
        textAlign: 'center',
        flex: 1,
        color: 'white',
        alignSelf: 'center',
        fontSize: 0.07*width
    },
    main2: {
        flexDirection: 'row',
        marginTop: -0.02*height
    },
    description: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 0.04*width
    },
    degrees: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
    },
    minDegree: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 0.04*width
    },
    maxDegree: {
        flex: 1,
        color: 'white',
        textAlign: 'center',
        fontSize: 0.04*width
    },
    attributes: {
        flexDirection: 'row'
    },
    attribute1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 0.02*width
    },
    attribute2: {
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
    },
    attribute3: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 0.02*width
    },
    attr: {
        color: 'white',
        marginLeft: 0.01*width
    },
})

