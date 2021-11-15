import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Header from '../../components/Header/HeaderWithNavigationIcon';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import Metarial from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const {width} = Dimensions?.get('screen');

export default function Upcoming(props) {
  console.log('Upcoming Props: ', props);
  return (
    <View style={{flex: 1}}>
      <Header
        title={
          props?.route?.params?.data?.date
            ? props?.route?.params?.data?.date
            : moment(props?.route?.params?.data?.date).format(
                'DD MMMM YYYY',
              ) === 'Invalid date'
            ? 'DETAIL'
            : props?.route?.params?.data?.date
        }
      />
      <View style={{flex: 1, backgroundColor: Colors?.white, paddingTop: 10}}>
        <ScrollView contentContainerStyle={{padding: 15}}>
          <StoreDetail data={props?.route?.params?.data} />
          <TimeSchedule data={props?.route?.params?.data} />
          <ClockInOut data={props?.route?.params?.data} type="clockIn" />
          <ClockInOut data={props?.route?.params?.data} type="clockOut" />
        </ScrollView>
      </View>
    </View>
  );
}

export const ClockInOut = props => {
  const {data, type} = props;

  return (
    <View style={{width: '100%', marginTop: 25}}>
      <Label label={type === 'clockIn' ? 'CLOCK IN' : 'CLOCK OUT'} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: Colors?.lightgray,
          borderRadius: 10,
          padding: 15,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <View style={{flex: 0.1}}>
          <Metarial
            name="qrcode-scan"
            size={RFPercentage(2.3)}
            color={Colors?.black}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.medium,
              fontSize: RFPercentage(2),
              color: Colors?.black,
              letterSpacing: 0.3,
            }}>
            {type === 'clockIn'
              ? data?.clockInTime
                ? data?.clockInTime
                : '-- : --'
              : data?.clockOutTime
              ? data?.clockOutTime
              : '-- : --'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const TimeSchedule = props => {
  const {data} = props;

  return (
    <View style={{width: '100%', marginTop: 25}}>
      <Label label={'TIME SCHEDULE'} />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          backgroundColor: Colors?.lightgray,
          borderRadius: 10,
          padding: 15,
          paddingTop: 20,
          paddingBottom: 20,
        }}>
        <View style={{flex: 0.1}}>
          <Feather
            name="clock"
            size={RFPercentage(2.3)}
            color={Colors?.black}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.medium,
              fontSize: RFPercentage(2),
              color: Colors?.black,
              letterSpacing: 0.3,
            }}>
            {data?.startTime} - {data?.endTime}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const StoreDetail = props => {
  const {data} = props;

  return (
    <View style={{width: '100%'}}>
      <Label label={'STORE'} />
      <DetailStore data={data} />
    </View>
  );
};

export const DetailStore = props => {
  const {data} = props;

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: Colors?.lightgray,
        borderRadius: 10,
      }}>
      <View style={{flex: 0.3}}>
        <Thumbnail />
      </View>
      <View style={{flex: 1, padding: 5}}>
        <View>
          <View
            style={{
              bottom: 5,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: Fonts?.medium,
                fontSize: RFPercentage(2),
                color: Colors?.black,
                letterSpacing: 0.3,
              }}>
              {data?.title}
            </Text>
          </View>
          <View
            style={{
              paddingTop: 5,
              paddingBottom: 10,
              width: '100%',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.medium,
                fontSize: RFPercentage(1.6),
                color: Colors?.gray,
                letterSpacing: 0.3,
                lineHeight: 18,
              }}
              numberOfLines={2}>
              {data?.address}
            </Text>
          </View>
        </View>
        <ViewMaps />
      </View>
    </View>
  );
};

export const ViewMaps = props => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        borderColor: Colors?.red,
        borderRadius: 25,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
      }}>
      <Text
        style={{
          fontSize: RFPercentage(1.7),
          fontFamily: Fonts?.medium,
          color: Colors?.red,
          letterSpacing: 0.3,
        }}>
        View maps
      </Text>
    </TouchableOpacity>
  );
};

export const Label = props => {
  const {label} = props;

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10,
      }}>
      <Text
        style={{
          fontFamily: Fonts?.bold,
          fontSize: RFPercentage(1.8),
          color: Colors?.black,
          letterSpacing: 0.8,
        }}>
        {label}
      </Text>
    </View>
  );
};

export const Thumbnail = () => {
  return (
    <View style={{width: '90%', height: width * 0.17, borderRadius: 8}}>
      <Image
        source={{url: `https://random.imagecdn.app/500/500`}}
        style={{
          borderRadius: 8,
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        resizeMode="cover"
      />
    </View>
  );
};
