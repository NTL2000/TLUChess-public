import auth from '@react-native-firebase/auth';

const signInWithGoogle = async (googleSignIn: any) => {
  await googleSignIn.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });
  // Get the users ID token
  const {idToken} = await googleSignIn.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

const signOutGoogle = (googleSignIn: any) => {
  googleSignIn.signOut();
  auth().signOut();
};

export {signInWithGoogle, signOutGoogle};
