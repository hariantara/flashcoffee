import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import Header from '../../components/Header/HeaderWithNavigationIcon';
import Dash from 'react-native-dash';

// API
import GET_UPCOMINGSCHEDULE from '../../apis/getNextSchedule';
import {RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';

const {width} = Dimensions?.get('screen');

export default function Upcoming(props) {
  const [list, setList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const subscription = fetchupComingSchedule();

    return () => {
      subscription;
    };
  }, []);

  const fetchupComingSchedule = () => {
    try {
      GET_UPCOMINGSCHEDULE()
        .then(res => {
          console.log('GET_UPCOMINGSCHEDULE Res: ', res);
          setList([...res]);
          setIsError(false);
          setIsLoading(false);
        })
        .catch(error => {
          throw new Error(error);
        });
    } catch (error) {
      console.log('Error fetchupComingSchedule: ', error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  if (isLoading && !isError) {
    return (
      <View style={{flex: 1}}>
        <Header title={'UPCOMING SCHEDULE'} />
        <View style={{flex: 1, alignItems: 'center', paddingTop: 15}}>
          <ActivityIndicator size="large" color={Colors?.gray} />
        </View>
      </View>
    );
  } else if (!isLoading && isError) {
    return (
      <View style={{flex: 1}}>
        <Header title={'UPCOMING SCHEDULE'} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: Fonts?.medium,
              fontSize: RFPercentage(2.2),
              color: Colors?.gray,
              letterSpacing: 0.3,
              textAlign: 'center',
            }}>
            You don't have any schedule yet.
          </Text>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{flex: 1}}>
        <Header title={'UPCOMING SCHEDULE'} />
        <View style={{flex: 1, backgroundColor: Colors?.white}}>
          <FlatList
            contentContainerStyle={{
              paddingRight: 15,
              paddingTop: 15,
              paddingBottom: 15,
            }}
            data={list}
            extraData={list}
            keyExtractor={(item, index) => `${item?.id}`}
            renderItem={({item, index}) => {
              return <UpcomingScheduleCard item={item} index={index} />;
            }}
          />
        </View>
      </View>
    );
  }
}

export const UpcomingScheduleCard = props => {
  const {item, index} = props;

  if (item) {
    if (item?.detail) {
      return <ScheduleCard item={item} index={index} />;
    } else {
      return <NoScheduleCard item={item} index={index} />;
    }
  } else {
    return null;
  }
};

export const ScheduleCard = props => {
  const {item} = props;

  return (
    <View style={{width: '100%', flexDirection: 'row', marginBottom: 15}}>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 5,
        }}>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(1.7),
            color: Colors?.gray,
            letterSpacing: 0.3,
          }}>
          {moment(item?.date).format('ddd').toUpperCase()}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(2.3),
            color: Colors?.black,
            letterSpacing: 0.3,
          }}>
          {moment(item?.date).format('DD')}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          borderRadius: 8,
          borderWidth: 0,
          height: width * 0.25,
          padding: 15,
          backgroundColor: Colors?.lightgray,
        }}>
        <View style={{width: '100%', flexDirection: 'row'}}>
          <Text>{item?.detail?.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const NoScheduleCard = props => {
  const {item, index} = props;

  return (
    <View style={{width: '100%', flexDirection: 'row', marginBottom: 15}}>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 5,
        }}>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(1.7),
            color: Colors?.gray,
            letterSpacing: 0.3,
          }}>
          {moment(item?.date).format('ddd').toUpperCase()}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(2.3),
            color: Colors?.black,
            letterSpacing: 0.3,
          }}>
          {moment(item?.date).format('DD')}
        </Text>
      </View>
      <View
        style={{
          borderStyle: 'dashed',
          borderWidth: 1,
          borderRadius: 8,
          borderColor: Colors?.gray,
          flex: 1,
          height: width * 0.25,
        }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontFamily: Fonts?.medium,
              fontSize: RFPercentage(1.7),
              color: Colors?.black,
              letterSpacing: 0.3,
              textAlign: 'center',
            }}>
            NO SCHEDULE
          </Text>
        </View>
      </View>
    </View>
  );
};
