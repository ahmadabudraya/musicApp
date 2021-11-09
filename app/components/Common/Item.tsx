import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle, Text } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { colors } from '../../config/theme';
import styles from './styles';

//import styles from './styles';
type ItemProps = {
  style?: StyleProp<ViewStyle>
  title:string
  onPress: () => void
}
export default function Item(props: ItemProps) {
  const { style, onPress, title } = props;
  return (
    <TouchableOpacity
      style={style}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Icon name={'right'} size={18} color={colors.gray['400']} />
      </View>
    </TouchableOpacity>
  );
}