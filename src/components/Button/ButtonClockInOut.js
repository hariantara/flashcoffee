import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';

export default function ButtonClockInOut(props) {
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors?.white,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <View
        style={{
          backgroundColor: Colors?.white,
          paddingTop: 10,
          paddingLeft: 15,
          paddingRight: 15,
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Button disabled={false} onPressClockIn={() => {}} title="Clock In" />
        <Button disabled={true} onPressClockOut={() => {}} title="Clock Out" />
      </View>
    </SafeAreaView>
  );
}

export const Button = props => {
  const {disabled, onPressClockIn, onPressClockOut, title} = props;
  return (
    <View
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity
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
