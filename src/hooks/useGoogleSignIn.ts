import {useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const useGoogleSignIn = () => {
  const [googleSigninInstance] = useState(GoogleSignin);
  GoogleSignin.configure({
    webClientId: '',
  });

  return googleSigninInstance;
};

export default useGoogleSignIn;
