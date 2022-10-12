import {View} from 'react-native';
import React from 'react';
import {ChessBoard} from '../components/board';
import {Frame, UIButton} from '../components/commom';
import {colors} from '../utils/constants';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';

type PlayPracticeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'PlayPractice'
>;

const PlayPractice: React.FC<PlayPracticeScreenProps> = ({navigation}) => {
  return (
    <Frame>
      <View>
        <UIButton
          title="Trở về"
          iconName="step-backward"
          iconColor={colors.primary}
          textColor={colors.primary}
          backgroundColor={colors.transparent}
          onPress={() => navigation.goBack()}
          style={{width: 100}}
        />

        <ChessBoard reverse={false} playWithSimpleAi={true} />
      </View>
    </Frame>
  );
};

export default PlayPractice;
