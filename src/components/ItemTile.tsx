import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Animated from 'react-native-reanimated';
// import {SharedElement} from 'react-navigation-shared-element';
import {type GifItem, type ItemTileProps} from '../types/types';

const ItemTile = ({
  title,
  smallImageUri,
  description,
  onPress,
}: ItemTileProps) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        style={({pressed}) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={onPress}>
        <View style={styles.innerContainer}>
          {/* <SharedElement id={`${id}`}> */}
          <Image
            // sharedTransitionTag={`${id}`}
            // source={{
            //   uri: 'https://static.vecteezy.com/vite/assets/photo-masthead-375-b8ae1548.webp',
            // }}
            source={{uri: smallImageUri}}
            style={styles.image}
          />
          {/* </SharedElement> */}
        </View>
        <View style={styles.details}>
          <Text numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default ItemTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
    overflow: 'visible',
    backgroundColor: 'white',
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
    // flex: 1,
    width: 130,
    height: 130,
    marginBottom: 8,
    borderRadius: 8,
  },
  details: {
    padding: 6,
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    textAlign: 'center',
  },
});
