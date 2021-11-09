import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './main';

export default function Navigator() {

  const RootStack = createStackNavigator();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Main"
      >
        <RootStack.Screen name="Main" component={Main} />
      </RootStack.Navigator>
    </NavigationContainer>

  )
}