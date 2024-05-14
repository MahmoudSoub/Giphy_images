import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import React from 'react';
import type {GifItem} from '../types/types';

type DetailsHeaderProps = {
  isFavorite: boolean;
  handleFavoriteToggle: (item: GifItem) => void;
  handleGoBack: () => void;
  item: GifItem;
};

const DetailsHeader = ({
  isFavorite,
  handleFavoriteToggle,
  handleGoBack,
  item,
}: DetailsHeaderProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.backIcon} onPress={handleGoBack}>
          <AntDesign name="arrowleft" size={24} />
        </Pressable>
      </View>
      <Text style={styles.title}>About</Text>
      <Pressable
        style={styles.favoirteIcon}
        onPress={() => handleFavoriteToggle(item)}>
        <AntDesign
          name={isFavorite ? 'heart' : 'hearto'}
          size={24}
          color={isFavorite ? 'red' : 'black'}
        />
      </Pressable>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    height: 64,
    justifyContent: 'space-between',
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
