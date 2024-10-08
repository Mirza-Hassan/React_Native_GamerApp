import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import BottomTabNavigator from './navigation/BottomTabNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <BottomTabNavigator />
    </Provider>
  );
}
