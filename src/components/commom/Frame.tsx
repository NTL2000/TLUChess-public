import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Frame: React.FC<PropsWithChildren> = ({children}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        ...backgroundStyle,
      }}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
};

export default Frame;
