import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import ItemTile from '../components/ItemTile';
import FavoritesHeader from '../components/FavoritesHeader';
import {resetFavorites} from '../store/favorites';
import {FavoriteScreenProps, type GifItem} from '../types/types';

const FavoriteScreen = ({navigation}: FavoriteScreenProps) => {
  const {favoriteItems} = useSelector((state: any) => state.favoriteGIFS);
  const [sortState, setSortState] = useState(0);
  const dispatch = useDispatch();

  const pressHandler = (item: GifItem) => {
    navigation.navigate('Details', {item});
  };

  const handleResetFavorites = () => {
    Alert.alert("You're About To Delete All Your Favorites", 'Are You Sure?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(resetFavorites()),
      },
    ]);
  };

  const handleSortPress = () => {
    setSortState((sortState + 1) % 3);
  };

  const displayedArray =
    sortState === 0
      ? favoriteItems.slice()
      : [...favoriteItems].sort((a, b) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          return sortState === 1
            ? titleA.localeCompare(titleB)
            : titleB.localeCompare(titleA);
        });

  const renderList = ({item}: {item: GifItem}) => {
    return <ItemTile {...item} onPress={() => pressHandler(item)} />;
  };
  return (
    <View style={styles.container}>
      <FavoritesHeader
        handleSortPress={handleSortPress}
        handleResetFavorites={handleResetFavorites}
        sortState={sortState}
      />
      {favoriteItems.length === 0 ? (
        <View style={styles.container}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>You Have No Favorite GIFs!</Text>
          </View>
        </View>
      ) : (
        <View style={styles.listContainer}>
          <FlatList
            contentContainerStyle={{paddingBottom: 45, marginTop: 20}}
            showsVerticalScrollIndicator={false}
            data={displayedArray}
            renderItem={renderList}
          />
        </View>
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  listContainer: {
    // backgroundColor: 'red',
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
