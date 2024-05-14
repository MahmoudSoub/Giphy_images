import {FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {fetchSearchGifs} from '../util/GiphyAPI';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ItemTile from '../components/ItemTile';
import {ActivityIndicator} from 'react-native';
import debounce from 'lodash/debounce';
import type {GifItem, PaginationInfo, SearchScreenProps} from '../types/types';
import Toast from 'react-native-toast-message';

const SearchScreen = ({navigation}: SearchScreenProps) => {
  const [text, setText] = useState('');
  const [items, setItems] = useState<GifItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [didRequest, setDidRequest] = useState(false);
  const [callOnScrollEnd, setCallOnScrollEnd] = useState(true);
  const currentPage = useRef(1);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const pressHandler = (item: GifItem) => {
    navigation.navigate('Details', {item});
  };

  useEffect(() => {
    if (text.length === 0) {
      setItems([]);
      return;
    }
    const getSearchResults = debounce(async () => {
      currentPage.current = 1;

      setIsLoading(true);
      try {
        const response = await fetchSearchGifs(text);
        const data = response.data;
        setDidRequest(true);
        setItems(data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error fetching images',
          text2: `${error}`,
        });
      } finally {
        setIsLoading(false);
      }
    }, 1000);
    getSearchResults();

    return () => getSearchResults.cancel();
  }, [text]);

  const fetchNextPage = async () => {
    try {
      if (
        pagination &&
        pagination.offset + pagination.count >= pagination.total_count
      ) {
        setCallOnScrollEnd(false);
        return;
      }

      currentPage.current += 1;
      const response = await fetchSearchGifs(text, currentPage.current);
      const nextPage = response.data;
      setPagination(response.pagination);
      if (nextPage) {
        setItems(previousItems => [...previousItems, ...nextPage]);
      }
      console.log(pagination);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error fetching images',
        text2: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnEndReached = async () => {
    if (isLoading || items.length <= 0) return;

    if (!callOnScrollEnd) {
      setIsLoading(true);
      fetchNextPage();
      setCallOnScrollEnd(true);
    }
  };

  const renderFooter = () => {
    return isLoading && <ActivityIndicator size="large" />;
  };

  const renderList = useCallback(({item}: {item: GifItem}) => {
    const itemProps = {
      id: item.id,
      title: item.title,
      smallImageUri: item.images?.fixed_width_downsampled.url,
      description: item.user?.description,
      type: item.type,
      slug: item.slug,
      imageUri: item.images?.original.url,
      url: item.url,
    };
    return <ItemTile {...itemProps} onPress={() => pressHandler(itemProps)} />;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <AntDesign
          style={styles.icon}
          name="search1"
          size={20}
          color={'royalblue'}
        />
        <TextInput
          style={styles.input}
          placeholder="Search..."
          placeholderTextColor={'gray'}
          value={text}
          onChangeText={setText}
        />
      </View>
      {isLoading && items.length === 0 ? (
        <View style={styles.loadingIndicator}>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <>
          {items.length === 0 && didRequest ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>No Results Found.</Text>
              <Text style={styles.text}>Please Try Another Keyword!</Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              <FlatList
                ListEmptyComponent={({response}) => {
                  return (
                    <View>
                      <Text style={{textAlign: 'center'}}>
                        Search To Find Your Next Favorite GIF!
                      </Text>
                    </View>
                  );
                }}
                contentContainerStyle={{paddingBottom: 45, marginTop: 20}}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                data={items}
                renderItem={renderList}
                onEndReached={handleOnEndReached}
                onMomentumScrollBegin={() => setCallOnScrollEnd(false)}
                ListFooterComponent={renderFooter}
                onEndReachedThreshold={0.5}
              />
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: 40,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    borderRadius: 5,
  },
  input: {
    width: '100%',
    height: '100%',
    marginLeft: 5,
  },
  icon: {
    marginLeft: 30,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'gray',
    marginLeft: 10,
  },
  listContainer: {
    width: '80%',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
