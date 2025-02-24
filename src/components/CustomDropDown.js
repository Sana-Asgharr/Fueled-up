import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');

const CustomDropDown = (props) => {
  const [open, setOpen] = useState(false);

  const { arrowUpColor = 'white', arrowDownColor = 'white' } = props;

  return (
    <View style={[styles.container, open && { zIndex: 1000 },  {...props.mainContainer}]}> 
      <DropDownPicker
        open={open}
        value={props.value}
        items={props.data}
        setValue={props.setValue}
        setItems={props.setItems}
        setOpen={setOpen}
        placeholder={props.placeholder}
        onChangeValue={props.onChangeValue}
        dropDownDirection= {props.top ? "TOP" : "BOTTOM"}
        style={[
          styles.dropdown,
          { ...props.CustomStyle },
        ]}
        placeholderStyle={{ color: 'rgba(100, 116, 139, 1)', fontFamily: 'Poppins-Regular', ...props.placeholderStyle }}
        textStyle={{ color: 'rgba(176, 181, 201, 1)', fontFamily: 'Poppins-Regular', fontSize:14,top:1 }}
        labelStyle={{ color: 'rgba(255, 255, 255, 1)', fontFamily: 'Poppins-Regular', ...props.labelStyle }}
        listItemContainerStyle={{
          backgroundColor:  'rgba(249, 250, 251, 1)', 
          borderBottomWidth:1, borderBottomColor:'rgba(244, 244, 245, 1)'
        }}
        selectedItemContainerStyle={{backgroundColor:'rgba(249, 250, 251, 1)'}}
        selectedItemLabelStyle={{color:'white'}}
        dropDownContainerStyle={[
          styles.dropDownContainer,
          open && { maxHeight: height * 0.36 }, 
          { ...props.dropDownContainerStyle2 },
        ]}
        showTickIcon={false}
        ArrowUpIconComponent={({ style }) => (
          <MaterialCommunityIcons name="chevron-up" size={26} color={'rgba(100, 116, 139, 1)'} />
        )}
        ArrowDownIconComponent={({ style }) => (
          <MaterialCommunityIcons name="chevron-down" size={26} color={'rgba(100, 116, 139, 1)'} />
        )}
        scrollViewProps={{
          showsVerticalScrollIndicator: true,
        }}
      />
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  container: {
    width: width * 0.89,
    alignSelf: 'center',
    zIndex: 1,
  },
  dropdown: {
    height: height * 0.06,
    borderWidth: 0.8,
    borderRadius: 13,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(249, 250, 251, 1)',
    borderColor: 'rgba(255, 255, 255, 0.23)',
  },
  dropDownContainer: {
    marginTop: 10,
    width: width * 0.89,
    alignSelf: 'center',
    backgroundColor: 'rgba(249, 250, 251, 1)',
    borderColor: 'rgba(241, 245, 249, 1)',
    borderRadius:20
  },
});
