import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import LinearGradient from 'react-native-linear-gradient';
  // import {Fonts} from '../../constants/Themes';
  import {RFPercentage} from 'react-native-responsive-fontsize';
  import CustomButton from './CustomButton';
  import Entypo from 'react-native-vector-icons/Entypo';
  
  const screenData = [
    {
      id: 1,
      title: 'Tracking our Vital Health',
      subTitle:
        'Watt tracks our lifestyle’s Rest, Vitality and Stability levels to help us remain healthy, active and balanced.',
      image: require('../../assets/images/watt/OnBoardingOne.png'),
    },
    {
      id: 2,
      title: 'Rest: Sleep and Recovery Quality',
      subTitle:
        'Getting sufficient sleep is the core pillar of good health, productivity and well-being. ',
      image: require('../../assets/images/watt/OnBoardingTwo.png'),
    },
    {
      id: 3,
      title: 'Vitality: Physical Activity Level',
      subTitle:
        'Having an active lifestyle is the key to having a healthy mind and body.',
      image: require('../../assets/images/watt/OnBoardingThree.png'),
    },
    {
      id: 4,
      title: 'Stability: Lifestyle Equilibrium',
      subTitle:
        'Keeping a consistent sleep and physical activity helps us reach our fullest potential and mental wellbeing.',
      image: require('../../assets/images/watt/OnBoardingFour.png'),
    },
    {
      id: 5,
      title: 'Vital Power: Unified Vital Score',
      subTitle:
        'Watt combines our vital health scores into one to help us quickly visualize and adjust our lifestyle everyday.',
      image: require('../../assets/images/watt/OnBoardingFive.png'),
    },
    {
      id: 6,
      title: 'Plug In: Connect Wearable',
      subTitle:
        'Watt requires us to wear our fitness tracker at all times to calculate our Vital Health metrics. The self-awareness will be worth it. ',
      image: require('../../assets/images/watt/OnBoardingSix.png'),
    },
  ];
  
  const WelcomeScreen = () => {
    const [step, setStep] = useState(1);
  
    const nextPress = () => {
      setStep(prev => (prev < 7 ? prev + 1 : prev));
    };
  
    const isFinalStep = step === 7;
    const currentData = screenData[step - 1];
  
    const getImageStyle = () => {
      return {
        width: ['3', '6'].includes(step.toString()) ? '100%' : '90%',
        height: '100%',
        left: step === 2 ? RFPercentage(4) : step === 4 ? RFPercentage(-4) : 0,
        top:
          step === 3
            ? RFPercentage(10)
            : step === 4
            ? RFPercentage(-4)
            : step === 5
            ? RFPercentage(5)
            : 0,
      };
    };
  
    if (isFinalStep) {
      return (
        <LinearGradient
          colors={['rgba(0, 16, 38, 1)', 'rgba(29, 71, 113, 1)']}
          style={styles.gradient}>
          <StatusBar
            backgroundColor={'transparent'}
            translucent
            barStyle={'light-content'}
          />
          <View style={styles.finalStepContainer}>
            <Text style={styles.finalStepTitle}>Vital Health Metrics Ready!</Text>
  
            <View style={styles.imageWrapper}>
              <Image
                source={require('../../assets/images/watt/checkBox.png')}
                resizeMode="contain"
                style={styles.finalImage}
              />
            </View>
  
            <View style={styles.finalButtonWrapper}>
              <CustomButton title="Start" onPress={() => {}} />
            </View>
          </View>
        </LinearGradient>
      );
    }
  
    return (
      <LinearGradient
        colors={['rgba(0, 16, 38, 1)', 'rgba(29, 71, 113, 1)']}
        style={styles.gradient}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
          barStyle={'light-content'}
        />
  
        <View style={styles.imageContainer}>
          <Image
            source={currentData.image}
            resizeMode="contain"
            style={getImageStyle()}
          />
        </View>
  
        <View style={styles.textWrapper}>
          <View>
            <Text style={styles.title}>{currentData.title}</Text>
            <Text style={styles.subTitle}>{currentData.subTitle}</Text>
          </View>
  
          <View style={styles.buttonGroup}>
            <CustomButton
              onPress={nextPress}
              title={step === 6 ? 'Plug in' : 'Continue'}
            />
            {step > 1 && step < 6 && (
              <TouchableOpacity
                onPress={() => setStep(step - 1)}
                activeOpacity={0.8}
                style={styles.returnButton}>
                <Entypo
                  name="chevron-small-left"
                  color={'rgba(248, 253, 255, 1)'}
                  size={RFPercentage(3.5)}
                />
                <Text style={styles.returnText}>Return</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </LinearGradient>
    );
  };
  
  export default WelcomeScreen;
  
  const styles = StyleSheet.create({
    gradient: {
      flex: 1,
    },
    finalStepContainer: {
      marginTop: RFPercentage(12),
    },
    finalStepTitle: {
      color: 'rgba(248, 253, 255, 1)',
      // fontFamily: Fonts.fontMedium,
      fontSize: RFPercentage(2.3),
      lineHeight: RFPercentage(2.8),
      textAlign: 'center',
    },
    imageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: RFPercentage(20),
    },
    finalImage: {
      width: RFPercentage(12),
      height: RFPercentage(12),
    },
    finalButtonWrapper: {
      width: '90%',
      alignSelf: 'center',
    //   position: 'absolute',
    //   bottom:0
      top: RFPercentage(42.5),
    },
    imageContainer: {
      width: '100%',
      height: '60%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textWrapper: {
      width: '90%',
      alignSelf: 'center',
      marginTop: RFPercentage(4),
      flex: 1,
    },
    title: {
      color: 'rgba(248, 253, 255, 1)',
      // fontFamily: Fonts.fontMedium,
      fontSize: RFPercentage(2.3),
      lineHeight: RFPercentage(2.8),
    },
    subTitle: {
      color: 'rgba(248, 253, 255, 1)',
      // fontFamily: Fonts.fontRegular,
      fontSize: RFPercentage(1.8),
      lineHeight: RFPercentage(2.8),
      marginTop: RFPercentage(1.5),
    },
    buttonGroup: {
      width: '100%',
      alignSelf: 'center',
      position: 'absolute',
      top: RFPercentage(22),
    },
    returnButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      width: '30%',
      marginTop: RFPercentage(1),
      alignSelf: 'center',
    },
    returnText: {
      color: 'rgba(248, 253, 255, 1)',
      // fontFamily: Fonts.fontMedium,
      fontSize: RFPercentage(2),
      marginTop: RFPercentage(1.5),
      bottom: RFPercentage(0.7),
      right: RFPercentage(0.6),
    },
  });
  