import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import Header from '../../components/Header/HeaderWithNavigationIcon';
import TimeSchedule from '../../components/TimeSchedule';
import {navigationRef} from '../../navigations/NavigationServices';

// API
import GET_UPCOMINGSCHEDULE from '../../apis/getNextSchedule';
import {RFPercentage} from 'react-native-responsive-fontsize';
import moment from 'moment';

const {width} = Dimensions?.get('screen');

export default function Upcoming(props) {
  const [list, setList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const subscription = fetchupComingSchedule();

    if (refreshing) {
      onRefresh();
    }

    return () => {
      subscription;
    };
  }, [refreshing]);

  const onRefresh = useCallback(() => {
    fetchupComingSchedule();
  }, [refreshing]);

  const fetchupComingSchedule = () => {
    try {
      GET_UPCOMINGSCHEDULE()
        .then(res => {
          console.log('GET_UPCOMINGSCHEDULE Res: ', res);
          setList([...res]);
          setIsError(false);
          setIsLoading(false);
          setRefreshing(false);
        })
        .catch(error => {
          console.log('Error: ', error);
          throw new Error(error);
        });
    } catch (error) {
      console.log('Error fetchupComingSchedule: ', error);
      setIsError(true);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  if (isLoading && !isError) {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'UPCOMING SCHEDULE'}
          onPressRightButton={() => setRefreshing(true)}
        />
        <View style={{flex: 1, alignItems: 'center', paddingTop: 15}}>
          <ActivityIndicator size="large" color={Colors?.gray} />
        </View>
      </View>
    );
  } else if (!isLoading && isError) {
    return (
      <View style={{flex: 1}}>
        <Header
          title={'UPCOMING SCHEDULE'}
          onPressRightButton={() => setRefreshing(true)}
        />
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
        <Header
          title={'UPCOMING SCHEDULE'}
          onPressRightButton={() => setRefreshing(true)}
        />
        <View style={{flex: 1, backgroundColor: Colors?.white, zIndex: -99}}>
          <FlatList
            ListHeaderComponent={() => {
              return (
                <View
                  style={{
                    padding: 15,
                    backgroundColor: Colors?.white,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts?.bold,
                      fontSize: RFPercentage(2),
                      color: Colors?.black,
                      letterSpacing: 0.5,
                    }}>
                    {moment(list[0]?.date).format('MMMM YYYY')?.toUpperCase()}
                  </Text>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => setRefreshing(true)}
              />
            }
            contentContainerStyle={{
              // paddingRight: 15,
              // paddingTop: 15,
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
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 15,
        paddingRight: 15,
        marginBottom: 10,
      }}>
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
        onPress={() => {
          try {
            navigationRef?.current?.navigate('Detail', {data: item?.detail});
          } catch (error) {
            console.log('Error to navigate: ', error);
          }
        }}
        style={{
          flex: 1,
          borderRadius: 8,
          borderWidth: 0,
          // height: width * 0.25,
          padding: 15,
          backgroundColor: Colors?.lightgray,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View style={{top: 2, width: '100%', flexDirection: 'row'}}>
          <Text
            numberOfLines={3}
            style={{
              fontFamily: Fonts?.medium,
              fontSize: RFPercentage(2),
              color: Colors?.black,
              letterSpacing: 0.3,
            }}>
            {item?.detail?.title}
          </Text>
        </View>
        <View
          style={{
            top: 5,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View>
            <TimeSchedule
              startTime={item?.detail?.startTime}
              endTime={item?.detail?.endTime}
            />
          </View>
          {moment(moment(item?.date).format('YYYY-MM-DD')).isSame(
            moment().format('YYYY-MM-DD'),
          ) ? (
            <View
              style={{
                right: 25,
                padding: 5,
                paddingTop: 2,
                paddingBottom: 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: Colors?.red,
                borderRadius: 5,
              }}>
              <Text
                style={{
                  fontSize: RFPercentage(1.5),
                  color: Colors?.white,
                  fontFamily: Fonts?.medium,
                  letterSpacing: 0.3,
                }}>
                TODAY
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const NoScheduleCard = props => {
  const {item, index} = props;

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        marginVertical: 15,
        paddingRight: 15,
        marginBottom: 10,
      }}>
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
          height: width * 0.17,
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
