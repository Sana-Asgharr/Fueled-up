import React from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BarChart } from 'react-native-gifted-charts';
import { RFPercentage } from 'react-native-responsive-fontsize';

const BarChartScreen: React.FC = () => {

    const normalizeStacks = (stacks) => {
        const totalValue = stacks.reduce((sum, stack) => sum + stack.value, 0);
        if (totalValue > 100) {
            return stacks.map(stack => ({
                ...stack,
                value: (stack.value / totalValue) * 100, 
            }));
        }
        return stacks;
    };

    
    const stackArray = [
        {
            stacks: normalizeStacks([
                { value: 30, color: 'rgba(107, 205, 246, 1)' },
                { value: 20, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(155, 137, 254, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' }, 
            ]),
            label: 'Mon 18',
        },
        {
            stacks: normalizeStacks([
                { value: 80, color: 'rgba(107, 205, 246, 1)' },
                { value: 30, color: 'rgba(242, 80, 79, 1)' },
                { value: 10, color: 'rgba(155, 137, 254, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' },
            ]),
            label: 'Tue 19',
        },
        {
            stacks: normalizeStacks([
                { value: 80, color: 'rgba(107, 205, 246, 1)' },
                { value: 50, color: 'rgba(242, 80, 79, 1)' },
                { value: 80, color: 'rgba(155, 137, 254, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' },
            ]),
            label: 'Wed 20',
        },
        {
            stacks: normalizeStacks([
                { value: 20, color: 'rgb(246, 107, 165)' },
                { value: 30, color: 'rgba(242, 80, 79, 1)' },
                { value: 40, color: 'rgba(107, 205, 246, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' }, 
            ]),
            label: 'Thu 21',
        },
        {
            stacks: normalizeStacks([
                { value: 40, color: 'rgba(255, 127, 80, 1)' },
                { value: 30, color: 'rgba(242, 80, 79, 1)' },
                { value: 40, color: 'rgba(107, 205, 246, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' }, 
            ]),
            label: 'Fri 22',
        },
        {
            stacks: normalizeStacks([
                { value: 40, color: 'rgba(255, 127, 80, 1)' },
                { value: 30, color: 'rgba(242, 80, 79, 1)' },
                { value: 40, color: 'rgba(107, 205, 246, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' }, 
            ]),
            label: 'Sat 23',
        },
        {
            stacks: normalizeStacks([
                { value: 20, color: 'rgb(246, 107, 165)' },
                { value: 30, color: 'rgba(242, 80, 79, 1)' },
                { value: 40, color: 'rgba(107, 205, 246, 1)' },
                { value: 100, color: 'rgba(255, 127, 80, 1)' },
                { value: 100, color: 'rgba(86, 160, 227, 0.5)' }, 
            ]),
            label: 'Today',
        },

    ];

    


    return (
        <LinearGradient
            colors={['rgba(0, 16, 38, 1)', 'rgba(29, 71, 113, 1)']}
            style={styles.gradient}>
            <View style={{borderWidth:1, borderColor:'white', borderRadius:14, padding:10, backgroundColor:'rgba(255, 255, 255, 0.1)'}}>
                <BarChart
                    stackData={stackArray}
                    hideYAxisText
                    hideRules
                    barWidth={19}
                    hideAxesAndRules
                    showValuesAsTopLabel
                    topLabelTextStyle={{
                        color : 'white',
                        fontSize : 10,
                        bottom : 6
                    }}
                    xAxisLabelsHeight={0}
                    xAxisLabelTextStyle={{
                        color: 'white',
                        fontSize : 9,
                        top:RFPercentage(1.8)
                    }}
                    initialSpacing={0}
                    endSpacing={0}
                    spacing={26}
                />
            </View>

        </LinearGradient>
    );
};

export default BarChartScreen;

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
