import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GameStatusProvider} from './src/components/board/boardContext';
import {
  Home,
  Login,
  PlayOnline,
  PlayOnlineOption,
  PlayPractice,
} from './src/screens';
import {RootStackParamList} from './types/navigation';

const App = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <GameStatusProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name={'Login'} component={Login} />
          <Stack.Screen name={'Home'} component={Home} />
          <Stack.Screen name={'PlayOnline'} component={PlayOnline} />
          <Stack.Screen
            name={'PlayOnlineOption'}
            component={PlayOnlineOption}
          />
          <Stack.Screen name={'PlayPractice'} component={PlayPractice} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameStatusProvider>
  );
};

export default App;
