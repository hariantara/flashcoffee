import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

export default function ButtonClockInOut(props) {
  console.log('ButtonClockInOut: ', props);
  const {onPressClockIn, onPressClockOut, prevData} = props;

  const [data, setData] = useState([]);

  useEffect(() => {
    updateData();
  }, [prevData]);

  const updateData = () => {
    try {
      setData([{...prevData}]);
    } catch (error) {
      //
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors?.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 9,
      }}>
      <View
        style={
          Platform?.OS === 'android'
            ? {
                backgroundColor: Colors?.white,
                paddingTop: 10,
                paddingLeft: 15,
                paddingRight: 15,
                paddingBottom: 10,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
            : {
                backgroundColor: Colors?.white,
                paddingTop: 10,
                paddingLeft: 15,
                paddingRight: 15,
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }
        }>
        <Button
          disabled={false}
          onPressClockIn={() => onPressClockIn()}
          title="Clock In"
        />
        <View style={{flex: 0.1}} />
        <Button
          disabled={data[0]?.clockInTime ? false : true}
          onPressClockOut={() => onPressClockOut()}
          title="Clock Out"
        />
      </View>
    </SafeAreaView>
  );
}

export const Button = props => {
  console.log('Button Props: >> ', props);
  const {disabled, onPressClockIn, onPressClockOut, title} = props;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
        disabled={disabled ? true : false}
        onPress={() => {
          if (title === 'Clock In') {
            onPressClockIn();
          } else {
            onPressClockOut();
          }
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          backgroundColor: disabled
            ? Colors?.gray
            : title === 'Clock Out'
            ? Colors?.red
            : Colors?.green,
          width: '100%',
          padding: 15,
        }}>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(2.1),
            color: Colors?.white,
            letterSpacing: 0.3,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
