import React, {useEffect} from 'react';
import Main from './src/navigations/index';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <Main />;
}
