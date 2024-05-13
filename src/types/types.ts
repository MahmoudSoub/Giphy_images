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
