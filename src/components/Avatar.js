import React from 'react';
import {View, Image, Dimensions} from 'react-native';
import Colors from '../utils/Colors';

const {width} = Dimensions?.get('screen');
const randomAvatarApi = 'https://i.pravatar.cc/300';

export default function Avatar() {
  return (
    <View
      style={{
        backgroundColor: Colors?.lightgray,
        width: width * 0.1,
        height: width * 0.1,
        borderWidth: 1,
        borderRadius: (width * 0.1) / 2,
        borderColor: Colors?.yellow,
      }}>
      <Image
        resizeMode="cover"
        source={{uri: randomAvatarApi}}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          borderRadius: (width * 0.1) / 2,
        }}
      />
    </View>
  );
}
