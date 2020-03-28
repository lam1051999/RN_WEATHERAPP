import React,{useState} from 'react';
import {
  StatusBar,
  ImageBackground,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';
import Search from './Search';
import YourLocation from './YourLocation';
import Swiper from 'react-native-swiper'

const backgroundImage = require('./assets/background.jpeg');

const App = () => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <StatusBar backgroundColor="rgba(0,0,0,0)" translucent />
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Swiper style={styles.wrapper}
          dot={<View style={{ backgroundColor: 'rgba(255,255,255,.3)', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7 }} />}
          activeDot={<View style={{ backgroundColor: '#fff', width: 13, height: 13, borderRadius: 7, marginLeft: 7, marginRight: 7 }} />}
          paginationStyle={{
            bottom: 70
          }}
          loop={false}>
          <Search selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
          <YourLocation selectedIndex={selectedIndex} />
        </Swiper>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
})

export default App;
