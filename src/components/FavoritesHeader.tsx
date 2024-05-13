import {Pressable, StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from 'react';

interface FavoritesHeaderProps {
  handleResetFavorites: () => void;
  handleSortPress: () => void;
  sortState: number;
}

const FavoritesHeader: React.FC<FavoritesHeaderProps> = ({
  handleResetFavorites,
  handleSortPress,
  sortState,
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.backIcon} onPress={handleSortPress}>
          {sortState === 0 ? (
            <MaterialCommunityIcons
              name="sort-ascending"
              size={24}
              color="black"
            />
          ) : sortState === 1 ? (
            <MaterialCommunityIcons
              name="sort-ascending"
              size={24}
              color="royalblue"
            />
          ) : (
            <MaterialCommunityIcons
              name="sort-descending"
              size={24}
              color="royalblue"
            />
          )}
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
