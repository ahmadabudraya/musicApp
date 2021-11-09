import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BaseStyle } from "../../config/styles";
import styles from './styles';
import commonStyles from '../../components/Common/styles';
import { axiosInstance } from "../../utils/axiosInstance";
import Separator from "../../components/Common/Separator";
import { Album } from "../Albums";
import { Song } from ".";

type ParamList = {
  SongLyrics: {
    song: Song;
  };
};

export default function SongLyrics() {

  const route = useRoute<RouteProp<ParamList, 'SongLyrics'>>();
  const [data, setData] = useState<{[key: string]: any}>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [hasLyrics, setHasLyrics] = useState<boolean>(false);
  const { song } = route.params;

  useEffect(() => {
    if(song.api_lyrics){
      axiosInstance.get(song.api_lyrics).then((response) => {
        if(response.data?.success){
          setHasLyrics(true);
        }
        setData(response.data.result);
        setLoading(false);
      }).catch((e)=>{
        setLoading(false);
      });
    }
  }, [song]);

  if (loading) {
    return (
      <View style={BaseStyle.loader}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  
  return (
    <View style={styles.content}>
      <Text style={styles.trackName}>{song.track}</Text>
      {hasLyrics ? (
        <ScrollView>
          <Text style={styles.lyrics}>{data?.lyrics}</Text>
        </ScrollView>
      ): <Text>{'There\'s no lyrics for this song/track'}</Text>}
      
    </View>

  )
}