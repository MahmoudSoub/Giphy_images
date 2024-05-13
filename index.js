/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
if (__DEV__) {
  require('./ReactotronConfig');
}

function AppIndex() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <App />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => AppIndex);
