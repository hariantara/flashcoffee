import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment';
import Dash from 'react-native-dash';

// Components
import HeaderCard from './Header/HeaderCard';
import TitleSchedule from './TitleSchedule';
import TimeSchedule from './TimeSchedule';

const {width} = Dimensions?.get('screen');

export default function TodaySchedule(props) {
  const {isLoading, isError, data, onRefresh} = props;

  if (isLoading && !isError) {
    return (
      <View style={{width: '100%'}}>
        <HeaderCard
          title="TODAY'S SCHEDULE"
          subtitle="Refresh"
          onPress={() => onRefresh()}
        />
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors?.gray} />
        </View>
      </View>
    );
  } else if (!isLoading && isError) {
    return (
      <View style={{width: '100%'}}>
        <HeaderCard
          title="TODAY'S SCHEDULE"
          subtitle="Refresh"
          onPress={() => onRefresh()}
        />
        <View
          style={{
            width: '100%',
            height: width * 0.3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.medium,
              fontSize: RFPercentage(1.8),
              color: Colors?.gray,
              letterSpacing: 0.3,
              textAlign: 'center',
            }}>
            No Schedule Today.
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{width: '100%'}}>
        <HeaderCard
          title="TODAY'S SCHEDULE"
          subtitle="Refresh"
          onPress={() => onRefresh()}
          disabled={isError ? true : false}
        />
        <View
          style={{
            backgroundColor: Colors?.lightgray,
            width: '100%',
            padding: 10,
            borderRadius: 8,
          }}>
          <TitleSchedule text={data[0]?.title} />
          <TimeSchedule
            startTime={data[0]?.startTime}
            endTime={data[0]?.endTime}
          />
          <AttendanceButton
            onPressClockIn={() => {}}
            onPressClockOut={() => {}}
          />
          <AttendanceTime
            clockInTime={data[0]?.clockInTime}
            clockOutTime={data[0]?.clockOutTime}
          />
        </View>
      </View>
    );
  }
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
          disabled={true}
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
          disabled={true}
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
        backgroundColor: type === 'clockin' ? Colors?.green : Colors?.red,
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
