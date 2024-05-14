import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';
import {SortState} from '../types/types';

interface FavoritesHeaderProps {
  handleResetFavorites: () => void;
  handleSortPress: () => void;
  sortState: SortState;
}

const FavoritesHeader = ({
  handleResetFavorites,
  handleSortPress,
  sortState,
}: FavoritesHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.backIcon} onPress={handleSortPress}>
          <MaterialCommunityIcons
            name={
              sortState === SortState.None
                ? 'sort-ascending'
                : sortState === SortState.Ascending
                ? 'sort-ascending'
                : 'sort-descending'
            }
            size={24}
            color={sortState === 0 ? 'black' : 'royalblue'}
          />
        </Pressable>
      </View>
      <Text style={styles.title}>Favorites</Text>
      <Pressable style={styles.favoirteIcon} onPress={handleResetFavorites}>
        <MaterialCommunityIcons name="delete" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default FavoritesHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingTop: 30,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    shadowOpacity: 0.85,
    shadowRadius: 0,
    shadowOffset: {width: 0, height: 0.333},
    shadowColor: 'rgb(216,216,216)',
    borderBottomColor: 'rgb(216,216,216)',
    marginTop: 40,
  },
  backIcon: {
    marginLeft: 20,
  },
  favoirteIcon: {
    marginRight: 20,
  },
  title: {
    fontWeight: '600',
    fontSize: 17,
  },
});
