import { StyleSheet, View, Text, FlatList } from 'react-native';
import React from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from "react-native-gifted-charts";
import Svg, { Defs, LinearGradient as SvgLinearGradient, Stop, Rect } from 'react-native-svg';

const Chart: React.FC = () => {
    const dataSet = [
        {
            data: [
                { value: 90 },
                { value: 72 },
                { value: 50 },
                { value: 56 },
                { value: 20 },
                { value: 72 },
                { value: 78 },

            ],
        }
    ];

    const dates = [
        {
            id: 1,
            date: 'Jan 18'
        },
        {
            id: 2,
            date: 'Jan 19'
        },
        {
            id: 3,
            date: 'Jan 20'
        },
        {
            id: 4,
            date: 'Jan 21'
        },
        {
            id: 5,
            date: 'Jan 22'
        },
        {
            id: 6,
            date: 'Jan 23'
        },
        {
            id: 7,
            date: 'Today'
        }
    ]

    return (
        <LinearGradient colors={['#001026', '#1D4771']} style={styles.container}>
            <View style={styles.borderWrapper}>
                <Svg height="100%" width="100%" style={styles.svgStyle}>
                    <Defs>
                        <SvgLinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                            <Stop offset="0%" stopColor="rgba(232, 138, 255, 1)" />
                            <Stop offset="50%" stopColor="rgba(96, 210, 255, 1)" />
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
                </Svg>

                <LinearGradient
                    colors={[
                        'rgba(232, 138, 255, 0.5)',
                        'rgba(96, 210, 255, 0.4)',
                        'rgba(115, 255, 190, 0.3)',
                        'rgba(252, 254, 137, 0.2)',
                        'rgba(255, 112, 105, 0.4)'
                    ]}
                    style={styles.gradientBox}
                >
                    <View>
                        <LineChart
                            data={dataSet[0].data}
                            areaChart
                            noOfSections={4}
                            stepHeight={70}
                            width={RFPercentage(44)}
                            backgroundColor="transparent"
                            xAxisLength={RFPercentage(44)}
                            hideDataPoints1={true}
                            xAxisColor={'transparent'}
                            yAxisColor={'transparent'}
                            hideYAxisText
                            xAxisType='dot'
                            rulesLength={RFPercentage(45)}
                            xAxisLabelsAtBottom
                            rulesColor={'rgba(96, 210, 255, 0.6)'}
                            startFillColor={'rgba(109, 200, 158, 0.2)'}
                            endFillColor={'rgba(199, 119, 114, 0.2)'}
                            startOpacity={1}
                            endOpacity={1}
                            initialSpacing={0}
                            endSpacing={-5}
                            color1='rgba(232, 138, 255, 0.5)'
                            showValuesAsDataPointsText={true}
                            hideDataPoints={false}
                            textColor={'#FFFFFF'}
                            dataPointsColor={'transparent'}
                            textFontSize={10}
                            textShiftY={-12}
                            textShiftX={5}
                            dashWidth={2}
                            dashGap={5}
                            xAxisLabelsVerticalShift={0}
                            xAxisLabelsHeight={0}
                            yAxisLabelWidth={0}
                            overflowTop={50}
                            spacing={53}   
                            zIndex1={200}                        
                        />
                    </View>
                </LinearGradient>
            </View>
            <View style={{ marginTop: 10, width: RFPercentage(44), alignItems: 'center' }}>
                <FlatList
                    data={dates}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    contentContainerStyle={{
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingHorizontal:5
                    }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{
                                fontSize: 10,
                                color: 'white',
                                textAlign: 'center'
                            }}>
                                {item.date}
                            </Text>
                        </View>
                    )}
                />
            </View>


        </LinearGradient>
    );
};

export default Chart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    borderWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
    },
    svgStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '90%',
    },
    gradientBox: {
        borderRadius: 10,
        maxWidth: RFPercentage(44),
        paddingTop: 30,
        // paddingHorizontal: 10,
    }
});



// import { StyleSheet, View, Text, FlatList } from 'react-native';
// import React from 'react';
// import { RFPercentage } from 'react-native-responsive-fontsize';
// import Svg, { Path, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
// import { LinearGradient as RNLinearGradient } from 'react-native-linear-gradient';

// type ChartProps = {};

// const Chart: React.FC<ChartProps> = () => {
//     const dataPoints: number[] = [71, 72, 64, 56, 68, 72, 70];
//     const width: number = RFPercentage(44);
//     const height: number = 150;
//     const maxValue: number = Math.max(...dataPoints);
//     const minValue: number = Math.min(...dataPoints);
//     const pointSpacing: number = width / (dataPoints.length - 1);

//     const getPath = (): string => {
//         let path = `M 0 ${height}`;
//         dataPoints.forEach((value, index) => {
//             const x = index * pointSpacing;
//             const y = height - ((value - minValue) / (maxValue - minValue)) * height;
//             path += ` L ${x} ${y}`;
//         });
//         path += ` L ${width} ${height} Z`;
//         return path;
//     };

//     return (
//                 <RNLinearGradient colors={['#001026', '#1D4771']} style={styles.container}>

//         <View style={styles.borderWrapper}>
//             <Svg height="100%" width="100%" style={styles.svgStyle}>
//                 <Defs>
//                     <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
//                         <Stop offset="0%" stopColor="rgba(232, 138, 255, 1)" />
//                         <Stop offset="50%" stopColor="rgba(96, 210, 255, 1)" />
//                         <Stop offset="100%" stopColor="rgba(115, 255, 190, 1)" />
//                     </LinearGradient>
//                 </Defs>
//                 <Rect
//                     x="0"
//                     y="0"
//                     width="86%"
//                     height="100%"
//                     rx="12"
//                     stroke="url(#grad)"
//                     strokeWidth="3"
//                     fill="transparent"
//                 />
//             </Svg>
//             <RNLinearGradient
//                 colors={['rgba(232, 138, 255, 0.5)', 'rgba(96, 210, 255, 0.4)', 'rgba(115, 255, 190, 0.3)', 'rgba(252, 254, 137, 0.2)', 'rgba(255, 112, 105, 0.4)']}
//                 style={styles.gradientBox}
//             >
//                 <Svg width={width} height={height}>
//                     <Defs>
//                         <LinearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
//                             <Stop offset="0%" stopColor="rgba(232, 138, 255, 0.6)" />
//                             <Stop offset="25%" stopColor="rgba(96, 210, 255, 0.5)" />
//                             <Stop offset="50%" stopColor="rgba(115, 255, 190, 0.4)" />
//                             <Stop offset="75%" stopColor="rgba(252, 254, 137, 0.3)" />
//                             <Stop offset="100%" stopColor="rgba(255, 112, 105, 0.2)" />
//                         </LinearGradient>
//                     </Defs>
//                     <Path d={getPath()} fill="url(#areaGrad)" stroke="rgba(255, 255, 255, 0.8)" strokeWidth={2} />
//                 </Svg>
//             </RNLinearGradient>
//             <FlatList
//                 data={['Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23', 'Today']}
//                 horizontal
//                 keyExtractor={(item, index) => index.toString()}
//                 contentContainerStyle={styles.dateContainer}
//                 renderItem={({ item }) => (
//                     <Text style={styles.dateText}>{item}</Text>
//                 )}
//             />
//         </View>
//         </RNLinearGradient>
//     );
// };

// const styles = StyleSheet.create({
//     borderWrapper: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20,
//         padding: 10,
//     },
//     svgStyle: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//     },
//     gradientBox: {
//         width: '86%',
//         height: 150,
//         borderRadius: 12,
//         overflow: 'hidden',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     dateContainer: {
//         marginTop: 10,
//         justifyContent: 'space-between',
//         width: '100%',
//         paddingHorizontal: 5,
//     },
//     dateText: {
//         fontSize: 10,
//         color: 'white',
//         textAlign: 'center',
//         marginHorizontal: 10,
//     }
// });

// export default Chart;