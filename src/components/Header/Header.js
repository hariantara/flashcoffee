import React from 'react';
import {
  View,
  Text,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import Colors from '../../utils/Colors';
import Fonts from '../../utils/Fonts';
import AvatarImage from '../Avatar';
import Feather from 'react-native-vector-icons/Feather';
import Images from '../../utils/Images';

const {width} = Dimensions?.get('screen');

export default function Header(props) {
  return (
    <View style={styles?.container}>
      <StatusBar
        barStyle={'dark-content'}
        translucent={Platform?.OS === 'ios' ? true : false}
        backgroundColor={Colors?.yellow}
      />
      <SafeAreaView>
        <View style={styles?.headerWrapper}>
          <View style={styles?.smallFlexLeft}>
            <AvatarImage />
          </View>
          <View style={styles?.titleWrapper}>
            <Text style={styles?.title}>LIVE ATTENDANCE</Text>
          </View>
          <View style={styles?.smallFlexRight}>
            <Feather name="bell" color={Colors?.black} size={RFPercentage(3)} />
          </View>
        </View>
      </SafeAreaView>
      {props?.children}
      <View style={{width: '100%'}}>
        <Image
          source={Images?.headerbg}
          style={{width: '100%', height: width * 0.14}}
        />
      </View>
    </View>
  );
}

const styles = {
  container: {
    width: '100%',
    backgroundColor: Colors?.yellow,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 20,
  },
  smallFlexLeft: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts?.bold,
    fontSize: RFPercentage(2.1),
    color: Colors?.black,
    letterSpacing: 0.3,
  },
  smallFlexRight: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
};
