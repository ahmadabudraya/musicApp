import { StyleSheet } from 'react-native';
import { colors } from './theme';

/**
 * Common basic style defines
 */
export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    borderColor:colors.gray['300'],
    borderWidth:1,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  safeAreaView: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center"
  },
  row:{
    justifyContent:'space-between',
    flexDirection:'row',
  },
  col:{
    justifyContent:'center',
    alignItems:'center',
    marginVertical:10
  },
  imageCover:{
    width:180,
    height:180,
  },
  btnBack:{
    marginTop:10
  },
  label:{
    fontWeight:'700',
    fontSize:18
  },
  value:{
    fontSize:17
  },
});
