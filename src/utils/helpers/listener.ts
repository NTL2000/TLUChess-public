import auth from '@react-native-firebase/auth';

const loginRequiredListener = (navigation: any) => {
  auth().onAuthStateChanged(user => {
    if (user == null) {
      navigation.navigate('Login');
    }
  });
};

export {loginRequiredListener};
