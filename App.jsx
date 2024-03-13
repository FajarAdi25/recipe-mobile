import React, { useEffect } from 'react';
import Router from './src/router';
import { setCustomText } from 'react-native-global-props';
import { LogLevel, OneSignal } from 'react-native-onesignal';

const App = () => {
  const customTextProps = {
    style: { fontFamily: 'AirbnbCereal' },
  };
  setCustomText(customTextProps);

  useEffect(() => {
    // Remove this method to stop OneSignal Debugging
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);

    // OneSignal Initialization
    OneSignal.initialize('eb5b482e-8d76-4d16-bb01-900d5524cfff');

    // requestPermission will show the native iOS or Android notification permission prompt.
    // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
    OneSignal.Notifications.requestPermission(true);

    // Method for listening for notification clicks
    OneSignal.Notifications.addEventListener('click', event => {
      console.log('OneSignal: notification clicked:', event);
    });
  });

  return <Router />;
};

export default App;
