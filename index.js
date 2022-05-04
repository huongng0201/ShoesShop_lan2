/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Settings } from 'react-native-fbsdk-next';
Settings.initializeSDK();
// Settings.shared.isAutoLogAppEventsEnabled = false

AppRegistry.registerComponent(appName, () => App);
