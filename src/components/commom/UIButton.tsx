import React from 'react';
import {Text, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '../../utils/constants';

interface UIButtonProperties {
  onPress?: () => void;
  title?: string;
  iconName?: string;
  textColor?: string;
  iconColor?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
}

const UIButton: React.FC<UIButtonProperties> = ({
  onPress,
  title,
  iconName,
  textColor,
  iconColor,
  backgroundColor,
  style,
  disabled,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        width: 200,
        height: 45,
        borderRadius: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          backgroundColor != null ? backgroundColor : colors.lightGreen,
        ...style,
      }}>
      <View
        style={{
          flex: 1,
          width: '75%',
          flexDirection: 'row',
          justifyContent:
            iconName == null || title == null ? 'center' : 'space-between',
          alignItems: 'center',
        }}>
        {iconName != null && (
          <Icon
            size={20}
            name={iconName}
            style={{
              color: iconColor == null ? colors.boldGreen : iconColor,
            }}
          />
        )}
        {title != null && (
          <Text
            style={{
              color: textColor == null ? colors.primary : textColor,
            }}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default UIButton;
