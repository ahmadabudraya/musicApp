import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { BaseStyle } from "../../config/styles";
import styles from './styles';
import commonStyles from '../../components/Common/styles';
import { axiosInstance } from "../../utils/axiosInstance";
import Separator from "../../components/Common/Separator";

export type Album = {
  album: string
  id_album?: number
  cover?: string
  api_album?: string
  api_tracks?: string
}
export default function Albums() {

  const [data, setData] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const artistId: number = 8352;
    axiosInstance.get(`v1/music/artists/${artistId}/albums`).then((response) => {
      setData(response.data.result.albums);
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
            <View style={commonStyles.itemContent}>
              <Text style={commonStyles.itemTitle}>{item.album}</Text>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </View>

  )
}