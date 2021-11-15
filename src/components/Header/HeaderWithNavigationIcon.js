import React from 'react';
import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import Feather from 'react-native-vector-icons/Feather';
import {navigationRef} from '../../navigations/NavigationServices';
import moment from 'moment';

export default function HeaderWithNavigationIcon(props) {
  return (
    <View style={{width: '100%', backgroundColor: Colors?.yellow}}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor={'transparent'}
      />
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 10,
            paddingBottom: 20,
          }}>
          <View
            style={{
              flex: 0.1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Feather
              onPress={() => {
                navigationRef?.current?.goBack(null);
              }}
              name="arrow-left"
              color={Colors?.black}
              size={RFPercentage(3)}
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: Fonts?.medium,
                fontSize: RFPercentage(2.1),
                color: Colors?.black,
                letterSpacing: 0.3,
              }}>
              {props?.title
                ? moment(props?.title).format('DD MMMM YYYY') === 'Invalid date'
                  ? props?.title
                  : moment(props?.title).format('DD MMMM YYYY')
                : props?.title}
            </Text>
          </View>
          <View style={{flex: 0.1}}>
            {props?.title === 'UPCOMING SCHEDULE' ? (
              <Feather
                onPress={() => {}}
                name="refresh-cw"
                color={Colors?.black}
                size={RFPercentage(2.7)}
              />
            ) : null}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
