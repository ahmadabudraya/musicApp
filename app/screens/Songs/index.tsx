import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BaseStyle } from "../../config/styles";
import styles from './styles';
import commonStyles from '../../components/Common/styles';
import { axiosInstance } from "../../utils/axiosInstance";
import Separator from "../../components/Common/Separator";
import { BottomTabNavigator } from "../../navigation/main";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Item from "../../components/Common/Item";

export type Song = {
  id_track: number
  track: string
  bpm: number
  api_track: string
  api_lyrics: string      
}

type ParamList = {
  SongLyrics: {song:Song}
};
type Props = NativeStackScreenProps<BottomTabNavigator, 'Songs'>;

export default function Songs({navigation} : Props) {

  const route = useRoute<RouteProp<ParamList, 'SongLyrics'>>();
  const [data, setData] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const artistID: number = 39943;
    const albumID: number = 831319;
    axiosInstance.get(`v1/music/artists/${artistID}/albums/${albumID}/tracks`).then((response) => {
      setData(response.data.result.tracks);
      setLoading(false);
    }).catch((e)=>{
      setLoading(false);
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
              title={item.track}
              onPress={()=>{
                navigation.navigate('SongLyrics',{
                  song: item
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