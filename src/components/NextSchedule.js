import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';
import {navigationRef} from '../navigations/NavigationServices';

const {width} = Dimensions?.get('screen');

// Components
import HeaderCard from './Header/HeaderCard';
import TitleSchedule from './TitleSchedule';
import TimeSchedule from './TimeSchedule';

export default function NextSchedule(props) {
  console.log('NextSchedule Props: ', props);
  const {isLoading, isError, data} = props;

  return (
    <View style={{width: '100%', marginTop: 18}}>
      <HeaderCard title="NEXT SCHEDULE" subtitle="See All" onPress={() => {}} />
      <ListNextSchedule {...props} />
    </View>
  );
}

export const ListNextSchedule = props => {
  const {isLoading, isError, data} = props;

  if (isLoading && !isError) {
    // Loader show
    return (
      <View
        style={{
          width: '100%',
          height: width * 0.3,
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color={Colors?.gray} />
      </View>
    );
  } else if (!isLoading && isError) {
    // show no data comming
    return (
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
          No Upcoming Schedule Yet.
        </Text>
      </View>
    );
  } else {
    // all run well and show them all
    return (
      <FlatList
        disableVirtualization={true}
        legacyImplementation={true}
        initialNumToRender={4}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        extraData={data}
        keyExtractor={(item, index) => `${item?.id}`}
        renderItem={({item, index}) => {
          if (item?.detail) {
            return <NextScheduleCard item={item} index={index} />;
          } else {
            return null;
          }
        }}
      />
    );
  }
};

export const NextScheduleCard = props => {
  console.log('NextScheduleCard Props: ', props);
  const {item, index} = props;

  if (item) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigationRef?.current?.navigate('Detail', {data: item?.detail})
        }
        style={{
          backgroundColor: Colors?.lightgray,
          marginRight: 10,
          width: width * 0.65,
          height: width * 0.33,
          borderWidth: 0,
          borderRadius: 14,
          padding: 8,
          paddingLeft: 10,
          paddingRight: 10,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              fontFamily: Fonts?.medium,
              color: Colors?.gray,
              fontSize: RFPercentage(1.6),
              letterSpacing: 0.3,
            }}>
            {moment(item?.date).format('dddd').toUpperCase()}
          </Text>
          <Text
            style={{
              left: 2,
              marginTop: 5,
              fontFamily: Fonts?.bold,
              color: Colors?.black,
              fontSize: RFPercentage(2.2),
              letterSpacing: 0.3,
            }}>
            {moment(item?.date).format('DD MMM')}
          </Text>
        </View>
        <View>
          <TitleSchedule text={item?.detail?.title} />
          <TimeSchedule
            startTime={item?.detail?.startTime}
            endTime={item?.detail?.endTime}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};
