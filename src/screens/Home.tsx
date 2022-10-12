import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {RootStackParamList} from '../../types/navigation';
import {Frame, UIButton} from '../components/commom';
import useGoogleSignin from '../hooks/useGoogleSignIn';
import {loginRequiredListener} from '../utils/helpers/listener';
import {signOutGoogle} from '../utils/helpers/firebase/auth';

type PlayOnlineScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const Home: React.FC<PlayOnlineScreenProps> = ({navigation}) => {
  const googleSignIn = useGoogleSignin();

  useEffect(() => {
    loginRequiredListener(navigation);
  });

  return (
    <Frame>
      <View>
        <UIButton
          title="Luyện tập"
          onPress={() => navigation.navigate('PlayPractice')}
        />
        <UIButton
          title="Chơi trực tuyến"
          onPress={() => navigation.navigate('PlayOnlineOption')}
        />
        <UIButton
          title="Đăng xuất"
          onPress={() => signOutGoogle(googleSignIn)}
        />
      </View>
    </Frame>
  );
};
export default Home;
