import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Artists, { Artist } from '../screens/Artists';
import Songs, { Song } from '../screens/Songs';
import Albums from '../screens/Albums';
import { colors } from '../config/theme';
import Search from '../screens/Search';
import ArtistAlbums from '../screens/Artists/ArtistAlbums';
import SongLyrics from '../screens/Songs/SongLyrics';

type MainStackParamList = {
  ArtistAlbums: {api_albums:string}
  SongLyrics: {song: Song}
  BottomTabNavigator: undefined
};
export type BottomTabNavigator = {
  Songs: undefined
  Artists: undefined
  Albums: undefined
  Search: undefined
  ArtistAlbums: {api_albums:string}
  SongLyrics: {song: Song}
}
const MainStack = createStackNavigator<MainStackParamList>();
const BottomTab = createBottomTabNavigator<BottomTabNavigator>();


export default function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />
      <MainStack.Screen name="ArtistAlbums" component={ArtistAlbums}/>
      <MainStack.Screen name="SongLyrics" component={SongLyrics}/>
    </MainStack.Navigator>
  )
}

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign:"center",
        tabBarActiveTintColor: colors.blue['500'],
        tabBarInactiveTintColor: colors.gray['500'],
        tabBarShowLabel: true,
        tabBarIconStyle: { display: "none" },
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {
          fontSize: 15,
          paddingBottom: 8,
        },
        tabBarStyle: { borderTopWidth: 1 },
      }}>
      <BottomTab.Screen name="Songs" component={Songs} />
      <BottomTab.Screen name="Artists" component={Artists} />
      <BottomTab.Screen name="Albums" component={Albums} />
      <BottomTab.Screen name="Search" component={Search} />
    </BottomTab.Navigator>
  )
}