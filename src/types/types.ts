import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Favorite: undefined;
  Details: {item: GifItem};
};

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;
export type SearchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Search'
>;
export type FavoriteScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Favorite'
>;
export type DetailsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export type RootTabParamList = {
  HomeStack: undefined;
  SearchStack: undefined;
  FavoriteStack: undefined;
  SignIn: undefined;
};

export interface GifItem {
  id: string;
  title: string;
  smallImageUri: string;
  description: string;
  type?: string;
  slug?: string;
  imageUri?: string;
  url?: string;
  images?: Record<string, any>;
  user?: Record<string, any>;
}

export interface ItemTileProps extends GifItem {
  onPress: () => void;
}

export interface PaginationInfo {
  count: number;
  offset: number;
  total_count: number;
}

export enum SortState {
  None,
  Ascending,
  Descending,
}
