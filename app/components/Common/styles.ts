import { StyleSheet } from 'react-native';
import { colors } from '../../config/theme';

export default StyleSheet.create({
  content: {
    alignItems: 'flex-start',
    width: '100%',
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: colors.gray['300']
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    //width: '60%',
    justifyContent: 'space-between'
  },
  itemTitle:{ 
    fontSize: 15, 
    color: colors.gray['700'] 
  }
})
