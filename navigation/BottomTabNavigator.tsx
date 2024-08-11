
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import GamesScreen from '../screens/GamesScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GamesStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GamesHome"
        component={GamesScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="GameDetailsScreen"
        component={GameDetailsScreen}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Games"
          component={GamesStackNavigator}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Favourites"
          component={FavouritesScreen}
          options={{headerShown: true}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
