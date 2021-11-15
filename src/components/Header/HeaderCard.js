import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';
import {RFPercentage} from 'react-native-responsive-fontsize';

const HeaderCard = props => {
  const {title, subtitle, onPress, disabled} = props;
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <Text
        style={{
          fontFamily: Fonts?.bold,
          fontSize: RFPercentage(2),
          color: Colors?.black,
          letterSpacing: 0.3,
        }}>
        {title}
      </Text>
      <TouchableOpacity
        disabled={disabled ? true : false}
        onPress={() => onPress()}
        style={{
          left: 12,
          padding: 10,
          paddingLeft: 15,
          paddingRight: 15,
        }}>
        <Text
          style={{
            fontFamily: Fonts?.medium,
            fontSize: RFPercentage(1.7),
            color: Colors?.red,
            letterSpacing: 0.3,
          }}>
          {subtitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderCard;
