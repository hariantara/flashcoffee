import React from 'react';
import {View, Text} from 'react-native';
import Header from './Header';
import moment from 'moment';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {RFPercentage} from 'react-native-responsive-fontsize';

export default function MainPageHeader() {
  return (
    <Header>
      <View
        style={{
          marginTop: 15,
          marginBottom: 25,
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts?.bold,
            fontSize: RFPercentage(8.5),
            color: Colors?.black,
            letterSpacing: 6,
            textAlign: 'center',
            marginBottom: 10,
          }}>
          {moment().format('hh:mm')}
        </Text>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(1.9),
            color: Colors?.black,
            letterSpacing: 0.3,
            textAlign: 'center',
          }}>
          {moment().format('dddd, DD MMM YYYY')}
        </Text>
      </View>
    </Header>
  );
}
