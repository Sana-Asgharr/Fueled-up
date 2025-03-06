import React from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Rect } from 'react-native-svg';
import SliderTwo from '../../components/SliderTwo';
import { RFPercentage } from 'react-native-responsive-fontsize';

const BarChartScreen = () => {
    const baseValue = 200;
    const defaultBarColor = 'hsla(209, 71.60%, 61.40%, 0.40)';
    const defaultBarHeight = baseValue;

    const normalizeStacks = (stacks) => {
        const totalStackValue = stacks.reduce((sum, stack) => sum + stack.value, 0);
        if (totalStackValue > baseValue) {
            return stacks.map(stack => ({
                ...stack,
                value: (stack.value / totalStackValue) * baseValue * 0.9,
            }));
        }
        return stacks;
    };



    const stackArray = [
        {
            stacks: normalizeStacks([
                { value: 20, color: 'rgba(107, 205, 246, 1)' },
                { value: 60, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(155, 137, 254, 1)' },
                { value: 0, color: 'rgba(70, 189, 182, 1)' },
                { value: 0, color: 'rgba(255, 127, 80, 1)' },

            ]),
            // label: 'Mon 18',
        },
        {
            stacks: normalizeStacks([
                { value: 10, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(107, 205, 246, 1)' },
                { value: 30, color: 'rgba(155, 137, 254, 1)' },
                { value: 0, color: 'rgba(255, 127, 80, 1)' },
                { value: 0, color: 'rgba(70, 189, 182, 1)' },


            ]),
            // label: 'Tue 19',
        },
        {
            stacks: normalizeStacks([
                { value: 30, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(107, 205, 246, 1)' },
                { value: 40, color: 'rgba(255, 127, 80, 1)' },
                { value: 3, color: 'rgba(70, 189, 182, 1)' },
                { value: 0, color: 'rgba(155, 137, 254, 1)' },
            ]),
            // label: 'Tue 19',
        },
        {
            stacks: normalizeStacks([
                { value: 20, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(107, 205, 246, 1)' },
                { value: 20, color: 'rgba(155, 137, 254, 1)' },
                { value: 0, color: 'rgba(255, 127, 80, 1)' },
                { value: 30, color: 'rgba(70, 189, 182, 1)' },


            ]),
            // label: 'Tue 19',
        },
        {
            stacks: normalizeStacks([
                { value: 20, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(107, 205, 246, 1)' },
                { value: 18, color: 'rgba(155, 137, 254, 1)' },
                { value: 40, color: 'rgba(255, 127, 80, 1)' },
                { value: 30, color: 'rgba(70, 189, 182, 1)' },


            ]),
            // label: 'Tue 19',
        },
        {
            stacks: normalizeStacks([
                { value: 8, color: 'rgba(155, 137, 254, 1)' },
                { value: 20, color: 'rgba(107, 205, 246, 1)' },
                { value: 10, color: 'rgba(242, 80, 79, 1)' },
                { value: 30, color: 'rgba(70, 189, 182, 1)' },
                { value: 40, color: 'rgba(255, 127, 80, 1)' },


            ]),
            // label: 'Wed 20',
        },
        {
            stacks: normalizeStacks([
                { value: 8, color: 'rgba(155, 137, 254, 1)' },
                { value: 0, color: 'rgba(107, 205, 246, 1)' },
                { value: 30, color: 'rgba(70, 189, 182, 1)' },
                { value: 10, color: 'rgba(242, 80, 79, 1)' },
                { value: 40, color: 'rgba(255, 127, 80, 1)' },

            ]),
            // label: 'Wed 20',
        },
    ];


    const dates = [
        {
            id: 1,
            date: 'Mon 18',
        },
        {
            id: 2,
            date: 'Tue 19',
        },
        {
            id: 3,
            date: 'Wed 20',
        },
        {
            id: 4,
            date: 'Thu 21',
        },
        {
            id: 5,
            date: 'Fri 22',
        },
        {
            id: 6,
            date: 'Sat 23',
        },
        {
            id: 7,
            date: 'Today',
        },
    ];

    return (
        <LinearGradient
            colors={['rgba(0, 16, 38, 1)', 'rgba(29, 71, 113, 1)']}
            style={styles.gradient}>
            <View>
                <Text style={styles.title}>BUSYNESS</Text>
                <Text style={styles.subtitle}>Occupied waking time</Text>
                <View style={styles.infoContainer}>
                    <View style={styles.infoHeader}>
                        <Text style={styles.infoText}>Busier than usual</Text>
                        <Text style={styles.infoText}>54%</Text>
                    </View>
                    <View style={styles.infoDetails}>
                        <Text style={styles.smallText}>45 activities</Text>
                        <Text style={styles.smallText}>of waking time</Text>
                    </View>
                    <SliderTwo value={54} />
                    <View style={{ marginTop: RFPercentage(3), left: 5 }}>
                        <Text style={{ color: 'white', fontSize: RFPercentage(1.7), }}>We have been more active recently </Text>
                    </View>
                </View>
            </View>
            <View style={styles.chartContainer}>
                <Svg height={RFPercentage(30)} width={RFPercentage(43)}>
                    {stackArray.map((bar, index) => {
                        const barX = index * 50 + 24;
                        let currentY = RFPercentage(28);

                        const totalStackValue = bar.stacks.reduce((sum, stack) => sum + stack.value, 0);
                        const percentageValue = Math.round((totalStackValue / baseValue) * 100);

                        return (
                            <React.Fragment key={`bar-${index}`}>
                                {/* Default Base Bar */}
                                <Rect
                                    x={barX}
                                    y={currentY - defaultBarHeight}
                                    width={20}
                                    height={defaultBarHeight}
                                    fill={defaultBarColor}
                                />

                                {/* Show Percentage Value on Top */}
                                <Text
                                    style={{
                                        position: 'absolute',
                                        left: barX,
                                        top: currentY - defaultBarHeight - 25,
                                        color: 'white',
                                        fontSize: RFPercentage(1.4),
                                    }}
                                >
                                    {percentageValue}%
                                </Text>

                                {/* Stacked Bars */}
                                {bar.stacks.map((stack, stackIndex) => {
                                    const stackHeight = stack.value;
                                    currentY -= stackHeight;

                                    return (
                                        <Rect
                                            key={`stack-${index}-${stackIndex}`}
                                            x={barX}
                                            y={currentY}
                                            width={20}
                                            height={stackHeight}
                                            fill={stack.color}
                                        />
                                    );
                                })}
                            </React.Fragment>
                        );
                    })}
                </Svg>
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
                        paddingHorizontal: RFPercentage(2.3),
                    }}
                    renderItem={({ item }) => (
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.chartDates}>{item.date}</Text>
                        </View>
                    )}
                />
            </View>
        </LinearGradient>
    );
};

export default BarChartScreen

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        alignItems: 'center',
        paddingTop: RFPercentage(8),
        paddingHorizontal: RFPercentage(2.7),
    },
    title: {
        color: 'white',
        fontSize: RFPercentage(1.8),
        textAlign: 'center',
    },
    subtitle: {
        color: 'white',
        fontSize: RFPercentage(1.6),
        textAlign: 'center',
        marginTop: 5,
    },
    infoContainer: {
        width: '100%',
        padding: RFPercentage(2.5),
        backgroundColor: 'rgba(86, 160, 227, 0.1)',
        borderRadius: 10,
        paddingBottom: RFPercentage(8),
        marginTop: RFPercentage(5),
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    infoText: {
        color: 'white',
        fontSize: RFPercentage(2.3),
    },
    infoDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 3,
    },
    smallText: {
        color: 'white',
        fontSize: RFPercentage(1.6),
    },
    chartContainer: {
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        // padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: RFPercentage(2),
    },
    chartDates: {
        fontSize: RFPercentage(1.3),
        color: 'white',
        textAlign: 'center',
        // fontFamily: fonts.HMMedium,
    },
});
