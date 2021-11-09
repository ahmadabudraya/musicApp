import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { BaseStyle } from "../../config/styles";
import styles from './styles';
import commonStyles from '../../components/Common/styles';
import { axiosInstance } from "../../utils/axiosInstance";
import Separator from "../../components/Common/Separator";
import { Album } from "../Albums";

type ParamList = {
  ArtistAlbums: {
    api_albums: string;
  };
};

export default function ArtistAlbums() {

  const route = useRoute<RouteProp<ParamList, 'ArtistAlbums'>>();
  const [data, setData] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { api_albums } = route.params;

  useEffect(() => {
    axiosInstance.get(api_albums).then((response) => {
      setData(response.data.result.albums);
      setLoading(false);
    }).catch((e)=>{
      setLoading(false);
    });
  }, [api_albums]);

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