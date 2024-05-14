import {FlatList, Pressable, StyleSheet} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {fetchGifs} from '../util/GiphyAPI';
import ItemTile from '../components/ItemTile';
import type {GifItem, HomeScreenProps} from '../types/types';
import Toast from 'react-native-toast-message';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {logout} from '../store/Auth';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [items, setItems] = useState<GifItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return (
          <Pressable onPress={() => dispatch(logout())}>
            <AntDesign name="logout" size={24} />
          </Pressable>
        );
      },
    });
  }, [navigation]);

  const pressHandler = (item: GifItem) => {
    navigation.navigate('Details', {item});
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      const getImages = async () => {
        const data = await fetchGifs();
        setItems(data);
        setIsLoading(false);
      };
      getImages();
    } catch (error) {
      Toast.show({
        type: 'error', // Set toast type to 'error'
        text1: 'Error fetching images',
        text2: `${error}`,
      });
    }
  }, []);

  const handleOnEndReached = async () => {
    if (items.length === 0) {
      return;
    }
    if (isLoading) {
      return;
    }
    const nextPage = await fetchGifs(currentPage + 1);
    if (nextPage) {
      setItems(previousItems => [...previousItems, ...nextPage]);
      setCurrentPage(currentPage + 1);
    }
  };

  const renderList = ({item}: {item: GifItem}) => {
    const itemProps = {
      id: item.id,
      title: item.title,
      smallImageUri: item.images?.fixed_width_downsampled?.url,
      description: item.user?.description,
      type: item.type,
      slug: item.slug,
      imageUri: item.images?.original?.url,
      url: item.url,
      // ...item,
    };
    return <ItemTile {...itemProps} onPress={() => pressHandler(itemProps)} />;
  };

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 16}}
      style={styles.container}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      data={items}
      keyExtractor={item => item.id}
      renderItem={renderList}
      onEndReached={handleOnEndReached}
      // onEndReachedThreshold={0.5}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
});
