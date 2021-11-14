import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Dash from 'react-native-dash';

export default function TodaySchedule(props) {
  return (
    <View style={{width: '100%'}}>
      <HeaderCard />
      <View
        style={{
          backgroundColor: Colors?.lightgray,
          width: '100%',
          padding: 10,
          borderRadius: 8,
        }}>
        <TitleSchedule text={'Mediterania Garden Residence'} />
        <TimeSchedule
          startTime={moment().format('hh:mm')}
          endTime={moment().add(5, 'hours').format('hh:mm')}
        />
        <AttendanceButton
          onPressClockIn={() => {}}
          onPressClockOut={() => {}}
        />
        <AttendanceTime clockInTime={'05 : 00'} clockOutTime={'17 : 00'} />
      </View>
    </View>
  );
}

export const AttendanceTime = props => {
  const {clockInTime, clockOutTime} = props;
  return (
    <View
      style={{
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: Fonts?.bold,
            fontSize: RFPercentage(2.1),
            color: Colors?.black,
            letterSpacing: 1.5,
          }}>
          {clockInTime ? clockInTime : '-- : --'}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Dash
          style={{width: '100%', height: 1, flexDirection: 'row', top: 2}}
          dashColor={Colors?.gray}
          dashThickness={1.5}
          dashLength={4}
        />
      </View>
      <View
        style={{
          flex: 0.6,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts?.bold,
            fontSize: RFPercentage(2.1),
            color: Colors?.black,
            letterSpacing: 1.5,
          }}>
          {clockOutTime ? clockOutTime : '-- : --'}
        </Text>
      </View>
    </View>
  );
};

export const AttendanceButton = props => {
  const {onPressClockIn, onPressClockOut} = props;
  return (
    <View
      style={{
        marginTop: 13,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.6,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          disabled={false}
          type="clockin"
          title="CLOCK IN"
          onPress={onPressClockIn}
        />
      </View>
      <View style={{flex: 1}} />
      <View
        style={{
          flex: 0.6,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          disabled={false}
          type="clockout"
          title="CLOCK OUT"
          onPress={onPressClockOut}
        />
      </View>
    </View>
  );
};

export const Button = props => {
  const {disabled, type, onPress, title} = props;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled ? true : false}
      style={{
        right: type === 'clockin' ? 5 : 0,
        borderRadius: 5,
        backgroundColor: disabled
          ? Colors?.gray
          : type === 'clockin'
          ? Colors?.green
          : Colors?.red,
        padding: 8,
        paddingLeft: 13,
        paddingRight: 13,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
      }}>
      <Text
        style={{
          fontFamily: Fonts?.bold,
          fontSize: RFPercentage(1.37),
          color: Colors?.white,
          letterSpacing: 0.3,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export const TimeSchedule = props => {
  const {startTime, endTime} = props;

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}>
      <Feather
        name="clock"
        size={RFPercentage(2)}
        color={Colors?.black}
        style={{top: 1.2}}
      />
      <View style={{flex: 1, marginLeft: 10}}>
        <Text
          style={{
            fontFamily: Fonts?.regular,
            fontSize: RFPercentage(1.8),
            color: Colors?.black,
            letterSpacing: 1.2,
          }}>
          {startTime} - {endTime}
        </Text>
      </View>
    </View>
  );
};

export const TitleSchedule = props => {
  const {text} = props;

  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: Fonts?.medium,
          color: Colors?.black,
          fontSize: RFPercentage(1.8),
          letterSpacing: 0.3,
          lineHeight: 18,
        }}>
        {text}
      </Text>
    </View>
  );
};

export const HeaderCard = props => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <Text
        style={{
          fontFamily: Fonts?.bold,
          fontSize: RFPercentage(2),
          color: Colors?.black,
          letterSpacing: 0.3,
        }}>
        TODAY'S SCHEDULE
      </Text>
      <TouchableOpacity
        style={{
          left: 12,
          padding: 10,
          paddingLeft: 15,
          paddingRight: 15,
        }}>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(1.7),
            color: Colors?.red,
            letterSpacing: 0.3,
          }}>
          Refresh
        </Text>
      </TouchableOpacity>
    </View>
  );
};
