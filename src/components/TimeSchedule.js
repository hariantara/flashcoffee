import React from 'react';
import {View, Text} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';

const TimeSchedule = props => {
  const {startTime, endTime} = props;

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Feather name="clock" size={RFPercentage(2)} color={Colors?.black} />
      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(1.6),
            color: Colors?.black,
            letterSpacing: 0.8,
          }}>
          {startTime} - {endTime}
        </Text>
      </View>
    </View>
  );
};

export default TimeSchedule;
