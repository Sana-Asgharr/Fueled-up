import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
// import Colors from '../../config/Colors';
// import Nav from '../../components/common/Nav';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from 'react-native-gifted-charts';
import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';
import Slider from '../../components/Slider';
// import {fonts} from '../../constants/theme';
const VitalsDetails = ({ navigation }: any) => {
  const dataSet = [
    {
      data: [
        { value: 90 },
        { value: 92 },
        { value: 60 },
        { value: 78 },
        { value: 62 },
        { value: 80 },
        { value: 84 },
        { value: 84 },
      ],
    },
  ];
  const dates = [
    {
      id: 1,
      date: 'Jan 18',
    },
    {
      id: 2,
      date: 'Jan 19',
    },
    {
      id: 3,
      date: 'Jan 20',
    },
    {
      id: 4,
      date: 'Jan 21',
    },
    {
      id: 5,
      date: 'Jan 22',
    },
    {
      id: 6,
      date: 'Jan 23',
    },
    {
      id: 7,
      date: 'Today',
    },
  ];
  const vitalsData = [
    {
      label: 'SLEEP P/NIGHT (AVG.)',
      value: '7h 30min',
      description: 'Average sleep duration in 24 hours',
    },
    {
      label: 'RECOVERY SLEEP %',
      value: '45%',
      description: 'Deep Sleep + REM Sleep from total sleep',
    },
    {
      label: 'HEART RATE VARIABILITY',
      value: '45%',
      description: 'Readiness of nervous system',
    },
    {
      label: 'RESTING HEART RATE',
      value: '2965 kcal',
      description: 'Estimated daily caloric requirements',
    },
    {
      label: 'RESPIRATORY RATE',
      value: '2965 kcal',
      description: 'Estimated daily caloric requirements',
    },
    {
      label: 'ACTIVE ENERGY',
      value: '2965 kcal',
      description: 'Energy expenditure relative to baseline',
    },
  ];
  return (
    <LinearGradient
      colors={['rgba(0, 16, 38, 1)', 'rgba(29, 71, 113, 1)']}
      style={styles.gradient}>
      {/* Nav */}
      {/* <Nav
        navigation={navigation}
        title="REST"
        subtitle="Sleep quality and recovery"
      /> */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.vitalsHeaderContainer}>
          <View style={styles.vitalsTextContainer}>
            <Text style={styles.vitalsLabel}>REST LEVEL</Text>
            <Text style={styles.vitalsValue}>Sufficient</Text>
          </View>
          <View style={styles.vitalsScoreContainer}>
            <Text style={styles.vitalsLabel}>REST SCORE</Text>
            <Text style={styles.vitalsValue}>91</Text>
          </View>
        </View>
        {/* Chart */}
        <View style={styles.borderWrapper}>
          {/* <Svg width={RFPercentage(51)} style={styles.svgStyle}>
            <Defs>
              <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0%" stopColor="rgba(232, 138, 255, 1)" />
                <Stop offset="80%" stopColor="rgba(96, 210, 255, 1)" />
                <Stop offset="100%" stopColor="rgba(115, 255, 190, 1)" />
              </SvgLinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="86%"
              height="100%"
              rx="12"
              stroke="url(#grad)"
              strokeWidth="3"
              fill="transparent"
            />
          </Svg> */}
          <LinearGradient
            colors={[
              'rgba(232, 138, 255, 0.3)',
              'rgba(96, 210, 255, 0.1)',
              'rgba(115, 255, 190, 0.2)',
              'rgba(252, 254, 137, 0.1)',
              'rgba(255, 112, 105, 0.3)',
            ]}
            style={styles.gradientBox}>
            <View>
              <LineChart
                data={dataSet[0].data}
                areaChart
                noOfSections={5}
                stepHeight={62}
                width={RFPercentage(44)}
                backgroundColor="transparent"
                xAxisLength={RFPercentage(44)}
                hideDataPoints1={true}
                xAxisColor={'transparent'}
                yAxisColor={'transparent'}
                hideYAxisText
                xAxisType="dot"
                rulesLength={RFPercentage(44)}
                xAxisLabelsAtBottom
                rulesColor={'rgba(96, 210, 255, 0.8)'}
                startFillColor={'rgba(109, 200, 158, 0.8)'}
                endFillColor={'rgba(199, 119, 114, 0.2)'}
                startOpacity={1}
                endOpacity={1}
                initialSpacing={2}
                endSpacing={20}
                color1="rgba(232, 138, 255, 0.5)"
                showValuesAsDataPointsText={true}
                hideDataPoints={false}
                textColor={'#FFFFFF'}
                dataPointsColor={'white'}
                textFontSize={RFPercentage(1.2)}
                textShiftY={-12}
                textShiftX={5}
                dashWidth={3}
                dashGap={5}
                xAxisLabelsVerticalShift={0}
                xAxisLabelsHeight={RFPercentage(-0.7)}
                yAxisLabelWidth={0}
                overflowTop={20}
                spacing={62}
                zIndex1={200}
              />
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            marginTop: 10,
            width: RFPercentage(44),
            alignItems: 'center',
          }}>
          <FlatList
            data={dates}
            keyExtractor={item => item.id.toString()}
            horizontal
            contentContainerStyle={{
              justifyContent: 'space-between',
              width: '100%',
              paddingHorizontal: 5,
            }}
            renderItem={({ item }) => (
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.chartDates}>{item.date}</Text>
              </View>
            )}
          />
        </View>
        {/* Gradient Container */}
        <View style={styles.vitalsHeaderContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <View>
              <Text style={[styles.vitalsLabel]}>VITALITY STATE</Text>
            </View>
            <View>
              <Text style={[styles.vitalsLabel, { fontSize: RFPercentage(1.6) }]}>
                Physical activity to baseline
              </Text>
            </View>
          </View>
        </View>
        <View style={{ width: '90%', marginTop: RFPercentage(2) }}>
          <Svg width="100%" height='100%' style={{ position: 'absolute', zIndex: 1 }}>
            <Defs>
              <SvgLinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="20%" stopColor="rgba(232, 138, 255, 1)" />
                <Stop offset="30%" stopColor="rgba(96, 210, 255, 1)" />
                <Stop offset="40%" stopColor="rgba(115, 255, 190, 1)" />
                <Stop offset="50%" stopColor="rgba(252, 254, 137, 1)" />
                <Stop offset="100%" stopColor="rgba(255, 112, 105, 1)" />
              </SvgLinearGradient>
            </Defs>
            <Rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              rx={RFPercentage(1.8)}
              stroke="url(#grad)"
              strokeWidth="2"
              fill="transparent"
            />
          </Svg>
          <View style={{ position: 'relative',}}>

            <LinearGradient colors={['rgba(232, 138, 255, 0.25)', 'rgba(96, 210, 255, 0.25)', 'rgba(115, 255, 190, 0.25)', 'rgba(252, 254, 137, 0.25)', 'rgba(255, 112, 105, 0.25)']} style={{ padding: RFPercentage(2), borderRadius: RFPercentage(1.8) }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                <Text style={[styles.vitalsLabel]}>Declined</Text>
                <Text style={[styles.vitalsLabel, { fontSize: RFPercentage(1.5) }]}>
                  Significantly below normal
                </Text>
              </View>
              <Slider value={30} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', flex: 1, marginTop: RFPercentage(2.2) }}>
                <Text style={[styles.vitalsLabel, { fontSize: RFPercentage(1.5) }]}>Below</Text>
                <Text style={[styles.vitalsLabel, { fontSize: RFPercentage(1.5) }]}>Normal</Text>
                <Text style={[styles.vitalsLabel, { fontSize: RFPercentage(1.5) }]}>Above</Text>

              </View>
            </LinearGradient>
          </View>
        </View>


        {/* Lower Body */}
        <View style={styles.vitalsHeaderContainer}>
          <View style={styles.vitalsTextContainer}>
            <Text style={[styles.vitalsLabel,
              // {fontFamily: fonts.HMSemiBold}
            ]}>
              REST STATISTICS
            </Text>
          </View>
        </View>
        {/*Vitals Data to Map */}
        <FlatList
          data={vitalsData}
          scrollEnabled={false} // Disable scrolling
          style={{ width: '100%' }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.vitalsContainer}>
              <View style={styles.labelInnerConatiner}>
                <View style={styles.vitalsTextContainer}>
                  <Text
                    style={[
                      styles.vitalsLabel,
                      {
                        // fontFamily: fonts.HMSemiBold,
                        fontSize: RFPercentage(2)
                      },
                    ]}>
                    {item.label}
                  </Text>
                  <Text
                    style={[
                      styles.vitalsValue,
                      {
                        fontSize: RFPercentage(1.9),
                        // fontFamily: fonts.HMRegular,
                      },
                    ]}>
                    {item.description}
                  </Text>
                </View>
                <View style={styles.vitalsScoreContainer}>
                  <Text style={styles.vitalsLabel}>{item.value}</Text>
                </View>
              </View>
            </View>
          )}
        />
        {/* About */}
        <View style={styles.vitalsHeaderContainer}>
          <View style={styles.vitalsTextContainer}>
            <Text style={[styles.vitalsLabel,
              // {fontFamily: fonts.HMSemiBold}
            ]}>
              ABOUT VITALITY
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.vitalsContainer,
            {
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              padding: RFPercentage(2),
              height: RFPercentage(25),
            },
          ]}>
          <TextInput
            style={{
              fontSize: RFPercentage(2),
              color: 'white',
              //   fontFamily: fonts.HMRegular,
            }}
            placeholder="Write something..."
            placeholderTextColor={'white'}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: RFPercentage(5),
  },
  vitalsHeaderContainer: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: RFPercentage(4.5),
  },
  vitalsTextContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  vitalsLabel: {
    color: 'white',
    fontSize: RFPercentage(1.9),
    // fontFamily: fonts.HMMedium,
  },
  vitalsValue: {
    color: 'white',
    fontSize: RFPercentage(2.7),
    marginTop: RFPercentage(0.6),
    // fontFamily: fonts.HMSemiBold,
  },
  vitalsScoreContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    position: 'absolute',
    right: 0,
  },
  //   Chart
  borderWrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    marginTop: RFPercentage(1.6),
  },
  svgStyle: {
    position: 'absolute',
    top: RFPercentage(2.9),
    left: 0,
    height: '100%',
    zIndex: 4,
  },
  gradientBox: {
    borderRadius: RFPercentage(1),
    maxWidth: RFPercentage(44),
    paddingTop: 30,
    // paddingHorizontal: 10,
  },
  vitalsContainer: {
    width: '90%',
    height: RFPercentage(10),
    borderRadius: RFPercentage(1),
    backgroundColor: 'rgba(86, 160, 227, 0.10)',
    marginTop: RFPercentage(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  labelInnerConatiner: {
    width: '90%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  chartDates: {
    fontSize: RFPercentage(1.6),
    color: 'white',
    textAlign: 'center',
    // fontFamily: fonts.HMMedium,
  },
});
export default VitalsDetails;