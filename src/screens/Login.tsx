import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {Frame, UIButton} from '../components/commom';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/navigation';
import auth from '@react-native-firebase/auth';
import {signInWithGoogle} from '../utils/helpers/firebase/auth';
import useGoogleSignin from '../hooks/useGoogleSignIn';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login: React.FC<LoginScreenProps> = ({navigation}) => {
  const googleSignIn = useGoogleSignin();

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user != null) {
        navigation.navigate('Home');
      }
    });
  });

  return (
    <Frame>
      <View>
        <UIButton
          style={styles.loginGoogleButton}
          title="Đăng nhập bằng google"
          onPress={() => signInWithGoogle(googleSignIn)}
        />
        <UIButton
          style={styles.playPracticeButton}
          title="Luyện tập"
          onPress={() => navigation.navigate('PlayPractice')}
        />
      </View>
    </Frame>
  );
};

const styles = StyleSheet.create({
  loginGoogleButton: {
    width: 220,
    borderRadius: 20,
  },
  playPracticeButton: {
    width: 220,
    borderRadius: 20,
  },
});

export default Login;
