import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Modal,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Text,
} from 'react-native';
import Colors from '../../utils/Colors';

// components
import Header from '../../components/Header/MainPageHeader';
import TodaySchedule from '../../components/TodaySchedule';
import NextSchedule from '../../components/NextSchedule';
import StickyButton from '../../components/Button/ButtonClockInOut';

// Dummy API
import API_GET_NEXTSCHEDULE from '../../apis/getNextSchedule';
import API_GET_TODAYSCHEDULE from '../../apis/getTodaySchedule';

// update data dummy purpose
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

export default function Home(props) {
  const [nextSchedules, setNextSchedules] = useState([]);
  const [todaySchedules, setTodaySchedule] = useState([]);

  const [isLoadingNextSchedule, setIsLoadingNextSchedule] = useState(true);
  const [isErrorNextSchedule, setIsErrorNextSchedule] = useState(false);

  const [isLoadingTodaySchedule, setIsLoadingTodaySchedule] = useState(true);
  const [isErrorTodaySchedule, setIsErrorTodayScehdule] = useState(false);

  const [refreshingToday, setRefreshingToday] = useState(false);

  const [universalRefresh, setUniversalRefresh] = useState(false);

  const [showModalLoader, setShowModalLoader] = useState(false);

  const [clockStatus, setClockStatus] = useState('clockIn');

  useEffect(() => {
    fetchTodayScheduleAPI();
    fetchNextScheduleAPI();

    if (refreshingToday) {
      onRefreshToday();
    }

    if (universalRefresh) {
      onUnviersalRefresh();
    }

    if (showModalLoader) {
      onClockInOut();
    }
  }, [refreshingToday, universalRefresh, showModalLoader]);

  const onClockInOut = useCallback(() => {
    try {
      AsyncStorage.getItem('@today')
        .then(res => {
          if (res) {
            const dataToday = JSON.parse(res);

            if (clockStatus === 'clockOut') {
              // Run Clock Out
              let oldData = dataToday;
              let newData = {
                ...oldData,
                clockOutTime: moment().format('hh:mm'),
              };

              AsyncStorage.setItem('@today', JSON.stringify(newData))
                .then(() => {
                  setRefreshingToday(true);
                })
                .catch(error => {
                  throw new Error(error);
                });
            } else {
              // RUn Clock In
              let oldData = dataToday;
              let newData = {
                ...oldData,
                clockInTime: moment().format('hh:mm'),
              };

              AsyncStorage.setItem('@today', JSON.stringify(newData))
                .then(() => {
                  setRefreshingToday(true);
                })
                .catch(error => {
                  throw new Error(error);
                });
            }
          } else {
            // do nothing
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    } catch (error) {
      setShowModalLoader(false);
    }
  }, [showModalLoader]);

  const onUnviersalRefresh = useCallback(() => {
    setIsLoadingTodaySchedule(true);
    setIsLoadingNextSchedule(true);
    fetchTodayScheduleAPI();
    fetchNextScheduleAPI();
  }, [universalRefresh]);

  const onRefreshToday = useCallback(() => {
    setIsLoadingTodaySchedule(true);
    fetchTodayScheduleAPI();
  }, [refreshingToday]);

  const fetchTodayScheduleAPI = () => {
    try {
      API_GET_TODAYSCHEDULE()
        .then(res => {
          console.log('fetchTodayScheduleAPI Res: ', res);
          if (res) {
            setTodaySchedule([{...res}]);
            setIsErrorTodayScehdule(false);
            setIsLoadingTodaySchedule(false);
            setRefreshingToday(false);
            setUniversalRefresh(false);
            setShowModalLoader(false);
          } else {
            throw new Error('Server Error');
          }
        })
        .catch(error => {
          console.log('fetchTodayScheduleAPI error: ', error);
          throw new Error(error);
        });
    } catch (error) {
      console.log('Error fetchTodayScheduleAPI: ', error);
      setIsErrorTodayScehdule(true);
      setIsLoadingTodaySchedule(false);
      setRefreshingToday(false);
      setUniversalRefresh(false);
      setShowModalLoader(false);
    }
  };

  const fetchNextScheduleAPI = () => {
    try {
      API_GET_NEXTSCHEDULE()
        .then(res => {
          console.log('Res Next Schedule: ', res);
          if (res) {
            setNextSchedules(res);
            setIsErrorNextSchedule(false);
            setIsLoadingNextSchedule(false);
            setUniversalRefresh(false);
          } else {
            setIsErrorNextSchedule(true);
            setIsLoadingNextSchedule(false);
            setUniversalRefresh(false);
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    } catch (error) {
      console.log('error next schedule: ', error);
      setIsErrorNextSchedule(true);
      setIsLoadingNextSchedule(false);
      setUniversalRefresh(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <ModalLoader visible={showModalLoader} />
      <View style={{flex: 1}}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => setUniversalRefresh(true)}
              refreshing={universalRefresh}
            />
          }
          contentContainerStyle={{
            padding: 15,
          }}>
          <TodaySchedule
            onNavigate={() => {
              try {
                props?.navigation?.navigate('Detail', {
                  data: todaySchedules[0],
                });
              } catch (error) {
                // error
              }
            }}
            isLoading={isLoadingTodaySchedule}
            isError={isErrorTodaySchedule}
            data={todaySchedules}
            onRefresh={() => {
              console.log('Today Refresh');
              setRefreshingToday(true);
            }}
          />
          <NextSchedule
            isLoading={isLoadingNextSchedule}
            isError={isErrorNextSchedule}
            data={nextSchedules}
          />
        </ScrollView>
        <StickyButton
          prevData={todaySchedules[0]}
          onPressClockIn={() => {
            console.log('Clock In Button Pressed');
            setClockStatus('clockIn');
            setShowModalLoader(true);
          }}
          onPressClockOut={() => {
            console.log('Clock Out Button Pressed');
            setClockStatus('clockOut');
            setShowModalLoader(true);
          }}
        />
      </View>
    </View>
  );
}

export const ModalLoader = props => {
  const {visible} = props;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: Colors?.dim,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: Colors?.white,
            padding: 25,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 15,
          }}>
          <Text>Loading...</Text>
          <ActivityIndicator
            size="large"
            color={Colors?.gray}
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
