import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import ImageContainer from './ImageContainer';
import {Fonts} from '../../constants/Themes';
import {RFPercentage} from 'react-native-responsive-fontsize';

const data = [
  {
    id: 'vitality',
    backgroundImg: require('../../assets/images/Stability.png'),
    crossIcon: require('../../assets/images/Cross.png'),
    image: require('../../assets/images/Stability2.png'),
    title: 'About Stability',
    subTitle: ' Circadian balance monitor',
  },
  
];

const list = [
  {
    id: 1,
    name: 'Sleep Consistency',
    data: [
      'Measures how stable our bedtime and wake-up time are over time.',
      'The less our sleep schedule fluctuates, the higher our Stability Score.',
      'Major shifts in bedtime or wake-up time will lower our score.',
    ],
  },
  {
    id: 2,
    name: 'Energy Consistency',
    data: [
      'Measures how much our daily energy expenditure fluctuates compared to your usual levels.',
      'Tracks whether our activity levels remain consistent or vary significantly over time.',
      'Large swings in energy output—such as some days being highly active and others being completely sedentary—can lower your Stability Score.',
    ],
  },
];

const VitalDetailsAbout = () => {
  return (
    <SafeAreaView style={styles.gradient}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <ImageContainer />
        <LinearGradient
          colors={['rgba(0, 16, 38, 1)', 'rgba(29, 71, 113, 1)']}
          style={styles.gradient}>
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              paddingBottom: RFPercentage(6),
            }}>
            <View style={{marginTop: RFPercentage(4)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                Our Stability score tracks the level of routine in our
                lifestyle, which is influenced mainly by our work schedule,
                sleep habits, and exercise patterns. Our Stability Score helps
                us identify inconsistencies in our routine and guide us back
                toward balance—the level of structure that works best for you.
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(3)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                A structured routine has been scientifically linked to better
                physical and mental health. If we maintain a consistent sleep
                schedule and stable activity levels, your Stability Score will
                likely be high. However, if our sleep and energy patterns
                frequently shift—due to things like traveling, partying, stress,
                or irregular work schedules—our Stability Score will drop.
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(4)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontMedium,
                  fontSize: RFPercentage(2.5),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                How is Stability Measured?
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(3)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                Our Stability Score is calculated daily, right after your
                wake-up time is detected from our fitness tracker. It is based
                on two primary factors:
              </Text>
            </View>
            <View style={{marginTop: RFPercentage(3.5)}}>
              <FlatList
                data={list}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => (
                  <View style={{marginBottom: RFPercentage(3.5)}}>
                    <Text
                      style={{
                        color: 'rgba(248, 253, 255, 1)',
                        fontFamily: Fonts.fontMedium,
                        fontSize: RFPercentage(2),
                        // textAlign: 'justify',
                        lineHeight: RFPercentage(2.8),
                      }}>
                      {`${item.id}. ${item.name}`}
                    </Text>
                    {item.data.map((point, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          marginTop: RFPercentage(1.3),
                          width: '90%',
                          alignSelf: 'center',
                        }}>
                        <Text
                          style={{
                            color: 'rgba(248, 253, 255, 1)',
                            fontFamily: Fonts.fontMedium,
                            fontSize: RFPercentage(3),
                            // textAlign: 'justify',
                            marginRight: RFPercentage(1),
                            lineHeight: RFPercentage(3.2),
                          }}>
                          •
                        </Text>
                        <Text
                          style={{
                            flex: 1,
                            color: 'rgba(248, 253, 255, 1)',
                            fontFamily: Fonts.fontRegular,
                            fontSize: RFPercentage(2),
                            // textAlign: 'justify',
                            lineHeight: RFPercentage(2.8),
                          }}>
                          {point}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              />
            </View>
            <View style={{marginTop: RFPercentage(10)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontMedium,
                  fontSize: RFPercentage(2.5),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                How to Use my Stability Score?
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(3)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                Unlike most health and fitness metrics, there is no "good" or
                "bad" Stability Score—only more stable or more variable. Here’s
                how you can use your Stability Score effectively:
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(3)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                <Text style={{color: 'rgb(87, 87, 87)'}}>✔ </Text>
                If your score is high → Your life is structured and predictable,
                which supports better mental resilience, physical recovery, and
                overall well-being.
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(3)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                <Text style={{color: 'rgb(87, 87, 87)'}}>✔ </Text>If your score
                is low → Your routine is unpredictable, which can either be
                exciting or disruptive, depending on your lifestyle needs.
              </Text>
            </View>

            <View style={{marginTop: RFPercentage(3)}}>
              <Text
                style={{
                  color: 'rgba(248, 253, 255, 1)',
                  fontFamily: Fonts.fontRegular,
                  fontSize: RFPercentage(2),
                  //   textAlign: 'justify',
                  lineHeight: RFPercentage(2.8),
                }}>
                Some people thrive on structure, feeling their best when they
                follow a consistent schedule. Others feel happier and more
                productive when they embrace spontaneity and variety. By
                tracking our Stability Score, we can fine-tune our lifestyle to
                find the perfect Order:Leisure ratio that brings us joy, health,
                and productivity. We can use it alongside our Vitality and Rest
                Scores to discover our optimal balance of structure and
                flexibility.
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </SafeAreaView>
  );
};

export default VitalDetailsAbout;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
