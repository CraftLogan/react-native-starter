import React from 'react';
import { View, Platform, StyleSheet, TextInput } from 'react-native';

import { fonts, colors } from '../styles';

const RNSTextInput = ({
  type,
  dark,
  style,
  placeholderTextColor,
  ...restProps
}) => {
  const finalStyle = [
    styles.default,
    type === 'bordered' && styles.bordered,
    dark && styles.dark,
    style && style,
  ];

  return (
    <View style={{ alignSelf: 'stretch', flexDirection: 'column' }}>
      <TextInput
        placeholderTextColor={placeholderTextColor || colors.black}
        underlineColorAndroid="white"
        {...restProps}
        style={finalStyle}
      />
      {Platform.OS === 'ios' && (
        <View style={{ height: 0.5, backgroundColor: 'white' }} />
      )}
    </View>
  );
};

const HEIGHT = 40;

const styles = StyleSheet.create({
  default: {
    height: HEIGHT,
    color: 'black',
    fontFamily: fonts.primaryRegular,
    textAlign: 'center',
    fontSize: 40,
    ...Platform.select({
      android: {
        paddingLeft: 5,
        opacity: 0.9,
      },
    }),
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: colors.black,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  dark: {
    color: colors.gray,
  },
  primary: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
});

export default RNSTextInput;
