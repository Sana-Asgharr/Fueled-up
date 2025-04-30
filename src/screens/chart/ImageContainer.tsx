import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Fonts} from '../../constants/Themes';

const ImageContainer = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/Stability.png')}
        resizeMode="cover"
        style={{width: '100%', height: '100%'}}>
        <View style={{width: '85%', height: '100%', alignSelf: 'center'}}>
          <View style={{marginTop: RFPercentage(8)}}>
            <TouchableOpacity style={{alignSelf: 'flex-end'}}>
              <Image
                source={require('../../assets/images/Cross.png')}
                resizeMode="contain"
                style={{width: RFPercentage(6), height: RFPercentage(6)}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop:RFPercentage(5.5)
            }}>
            <View>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFPercentage(2.8),
                  fontFamily: Fonts.fontMedium,
                }}>
                About Stability
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: RFPercentage(1.8),
                  fontFamily: Fonts.fontRegular,
                }}>
                Circadian balance monitor
              </Text>
            </View>
            <Image
              source={require('../../assets/images/Stability2.png')}
              resizeMode="contain"
              style={{width: RFPercentage(7), height: RFPercentage(7)}}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageContainer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: RFPercentage(35),
  },
});
