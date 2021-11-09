import React, { useState, useEffect } from "react";
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import { BaseStyle } from "../../config/styles";
import styles from './styles';
import commonStyles from '../../components/Common/styles';
import { axiosInstance } from "../../utils/axiosInstance";
import Separator from "../../components/Common/Separator";
type Result = {
  track: string
}
export default function Search() {

  const [searchText, setSearchText] = useState<string>('')
  const [data, setData] = useState<Result[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  let debounceFun: NodeJS.Timeout;

  useEffect(() => {
    if (searchText.length > 1) {
      clearTimeout(debounceFun);
      setLoading(true);
      debounceFun = setTimeout(() => {
        axiosInstance.get(`v1/music`, {
          params: {
            q: searchText,
            lyrics: 0
          }
        }).then((response) => {
          setLoading(false);
          setData(response.data.result);
        }).catch((e) => setLoading(false));
      }, 500)
    }else{
      setLoading(false);
      setData([]);
    }
    return () => {
      clearTimeout(debounceFun);
    }
  }, [searchText]);

  return (
    <View style={styles.content}>
      <TextInput
        placeholder={`Search Track..`}
        style={BaseStyle.textInput}
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={data}
          style={{ marginVertical: 10 }}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item, index }) => {
            return (
              <View style={commonStyles.itemContent}>
                <Text style={commonStyles.itemTitle}>{item.track}</Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => <Separator />}
        />
      )}

    </View>
  )
}