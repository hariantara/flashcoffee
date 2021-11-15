import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './NavigationServices';

const Stack = createNativeStackNavigator();

// Screens
import HomeScreen from '../screens/Home/index';
import UpcomingScreen from '../screens/Schedules/upcoming';
import DetailScreen from '../screens/Schedules/detail';

function MainNavigator() {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen
          name={'Home'}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Upcoming'}
          component={UpcomingScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={'Detail'}
          component={DetailScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
