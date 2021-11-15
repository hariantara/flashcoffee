import React from 'react';
import {View, Text} from 'react-native';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {RFPercentage} from 'react-native-responsive-fontsize';

const TitleSchedule = props => {
  const {text} = props;

  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
      <Text
        numberOfLines={1}
        style={{
          fontFamily: Fonts?.medium,
          color: Colors?.black,
          fontSize: RFPercentage(1.8),
          letterSpacing: 0.3,
          lineHeight: 18,
        }}>
        {text}
      </Text>
    </View>
  );
};

export default TitleSchedule;
