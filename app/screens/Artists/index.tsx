import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BaseStyle } from "../../config/styles";
import styles from './styles';
import Item from "../../components/Common/Item";
import Separator from "../../components/Common/Separator";
import { axiosInstance } from "../../utils/axiosInstance";
import { BottomTabNavigator } from "../../navigation/main";

export type Artist = {
  id_artist: number
  artist: string
  api_artist: string
  api_albums: string
  cover:string
}
type Props = NativeStackScreenProps<BottomTabNavigator, 'Artists'>;

export default function Artists({navigation} : Props) {
 
  const [data, setData] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axiosInstance.get('v1/music/artists', { params: { page: 1 } })
      .then((response) => {
        setLoading(false);
        setData(() => [...response.data.result]);
      }).catch((e) => {
        setLoading(false)
      });
  }, []);
  
  if (loading) {
    return (
      <View style={BaseStyle.loader}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    <View style={styles.content}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => {
          return (
            <Item
              title={item.artist}
              onPress={()=>{
                navigation.navigate('ArtistAlbums',{
                  api_albums:item.api_albums
                })}
              }
            />
          );
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>
  )
}