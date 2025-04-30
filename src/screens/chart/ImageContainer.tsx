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
// import {Fonts} from '../../constants/Themes';

interface Props {
  background: any;
  img: any;
  cross: any;
  title: string;
  subTitle: string;
}

const ImageContainer = (props: Props) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={props.background}
        resizeMode="cover"
        style={styles.imageBackground}>
        <View style={styles.innerContainer}>
          <View style={styles.crossContainer}>
            <TouchableOpacity style={styles.crossButton}>
              <Image
                source={props.cross}
                resizeMode="contain"
                style={styles.crossImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.contentRow}>
            <View>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.subTitle}>{props.subTitle}</Text>
            </View>
            <Image
              source={props.img}
              resizeMode="contain"
              style={styles.image}
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
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  innerContainer: {
    width: '85%',
    height: '100%',
    alignSelf: 'center',
  },
  crossContainer: {
    marginTop: RFPercentage(8),
  },
  crossButton: {
    alignSelf: 'flex-end',
  },
  crossImage: {
    width: RFPercentage(6),
    height: RFPercentage(6),
  },
  contentRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RFPercentage(5.5),
  },
  title: {
    color: 'white',
    fontSize: RFPercentage(2.8),
    // fontFamily: Fonts.fontMedium,
  },
  subTitle: {
    color: 'white',
    fontSize: RFPercentage(1.8),
    // fontFamily: Fonts.fontRegular,
  },
  image: {
    width: RFPercentage(7),
    height: RFPercentage(7),
  },
});
