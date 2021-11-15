import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, RefreshControl} from 'react-native';
import Colors from '../../utils/Colors';

// components
import Header from '../../components/Header/MainPageHeader';
import TodaySchedule from '../../components/TodaySchedule';
import NextSchedule from '../../components/NextSchedule';
import StickyButton from '../../components/Button/ButtonClockInOut';

// Dummy API
import API_GET_NEXTSCHEDULE from '../../apis/getNextSchedule';
import API_GET_TODAYSCHEDULE from '../../apis/getTodaySchedule';

export default function Home(props) {
  const [nextSchedules, setNextSchedules] = useState([]);
  const [todaySchedules, setTodaySchedule] = useState([]);

  const [isLoadingNextSchedule, setIsLoadingNextSchedule] = useState(true);
  const [isErrorNextSchedule, setIsErrorNextSchedule] = useState(false);

  const [isLoadingTodaySchedule, setIsLoadingTodaySchedule] = useState(true);
  const [isErrorTodaySchedule, setIsErrorTodayScehdule] = useState(false);

  const [refreshingToday, setRefreshingToday] = useState(false);

  const [universalRefresh, setUniversalRefresh] = useState(false);

  useEffect(() => {
    fetchTodayScheduleAPI();
    fetchNextScheduleAPI();

    if (refreshingToday) {
      onRefreshToday();
    }

    if (universalRefresh) {
      onUnviersalRefresh();
    }
  }, [refreshingToday, universalRefresh]);

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
      setIsErrorTodayScehdule(false);
      setIsLoadingTodaySchedule(false);
      setRefreshingToday(false);
      setUniversalRefresh(false);
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
        <StickyButton />
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors?.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
