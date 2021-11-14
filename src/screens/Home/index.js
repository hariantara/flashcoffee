import React from 'react';
import {View, ScrollView} from 'react-native';
import Colors from '../../utils/Colors';

// components
import Header from '../../components/Header/MainPageHeader';
import TodaySchedule from '../../components/TodaySchedule';

export default function Home(props) {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{
            padding: 15,
          }}>
          <TodaySchedule />
        </ScrollView>
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
