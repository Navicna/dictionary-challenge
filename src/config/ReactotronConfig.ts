import Reactotron from 'reactotron-react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';

const reactotron = Reactotron;

const tron = Reactotron.setAsyncStorageHandler(AsyncStorage)
  .configure({ name: 'Lets App' })  
  .useReactNative()
  .connect();

console.tron = tron;

export default reactotron;
