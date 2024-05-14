import React, {useState} from 'react';
import {addFavorite, removeFavorite} from '../store/Favorites';
import {
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import type {DetailsScreenProps, GifItem} from '../types/types';
import DetailsHeader from '../components/DetailsHeader';

const DetailsScreen = ({route, navigation}: DetailsScreenProps) => {
  const [modal, setModal] = useState<string | null>(null);

  const {item} = route.params;
  const smallImageUri = item.smallImageUri;
  const {favoriteItems} = useSelector((state: any) => state.FavoriteGifs);
  const favoriteItemsIds = favoriteItems.map((item: GifItem) => item.id);
  const isFavorite = favoriteItemsIds.includes(item.id);

  const dispatch = useDispatch();

  const handleFavoriteToggle = (item: GifItem) => {
    isFavorite
      ? dispatch(removeFavorite({id: item.id}))
      : dispatch(addFavorite(item));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleUrlPress = () => {
    if (!item.url) {
      return;
    }
    Linking.openURL(item.url);
  };

  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      scale.value = Math.max(1, Math.min(3, scale.value));
      savedScale.value = scale.value;
    });
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  return (
    <View style={styles.container}>
      <DetailsHeader
        handleGoBack={handleGoBack}
        item={item}
        isFavorite={isFavorite}
        handleFavoriteToggle={handleFavoriteToggle}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 60}}>
        <View style={styles.imageContainer}>
          <Pressable
            onPress={() => {
              setModal(item.id);
            }}>
            <Image source={{uri: smallImageUri}} style={styles.image} />
          </Pressable>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={1} style={styles.description}>
          {item.description}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Text style={styles.detailsLabel}>Type:</Text>
            <Text style={styles.detailsText}>{item.type}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsLabel}>Slug:</Text>
            <Text style={styles.detailsText}>{item.slug}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailsLabel}>URL:</Text>
            <Text onPress={handleUrlPress} style={styles.detailsText}>
              {item.url}
            </Text>
          </View>
        </View>
        <Modal visible={modal !== null} animationType="slide">
          <GestureDetector gesture={pinchGesture}>
            <View style={styles.modalContainer}>
              <Animated.Image
                source={modal !== null ? {uri: smallImageUri} : undefined}
                style={[styles.modalImage, animatedStyle]}
              />
              <Pressable
                onPress={() => {
                  setModal(null);
                  scale.value = 1;
                  savedScale.value = 1;
                }}
                style={styles.closeIcon}>
                <AntDesign name="closecircle" size={50} color="white" />
              </Pressable>
            </View>
          </GestureDetector>
        </Modal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  imageContainer: {
    flex: 1,
  },
  image: {
    resizeMode: 'cover',
    width: '100%',
    aspectRatio: 1,
    marginBottom: 36,
    alignSelf: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  modalImage: {
    width: 250,
    height: 250,
  },
  closeIcon: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    overflow: 'visible',
    backgroundColor: '#F2F2F2',
  },
  details: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailsLabel: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  detailsText: {
    flex: 1,
  },
});

export default DetailsScreen;
