import * as React from 'react';
import { FC, useContext, useEffect, useState } from 'react';
import { FlatList, Text } from 'react-native';
import { Center, Divider, Heading, Spinner, VStack } from 'native-base';
import { NoDataFiller } from './NoDataFiller';
import { ImageListItem } from './ImageListItem';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { AppStore, MainTabParamList, UsersParamsList } from '../App';
import { ImageInfo } from '../types/types';
import { Random } from 'unsplash-js/src/methods/photos/types';

type UserAlbumProps = CompositeScreenProps<
  NativeStackScreenProps<UsersParamsList, 'UserAlbum'>,
  BottomTabScreenProps<MainTabParamList>
>;

const unsplashApi = {
  async getRandom({ count }: { count: number }): Promise<Random[]> {
    const url = `https://api.unsplash.com/photos/random?count=1&client_id=oK3O_TJxzR80hvaXzkz9ZH_EtckSPlAy4R21w8Jkw34`;
    const res = await fetch(url);
    return await res.json();
  },
};

export const UserAlbum: FC<UserAlbumProps> = ({ route, navigation }) => {
  const { userId, albumId } = route.params;
  const { users, albums } = useContext(AppStore)!;
  const user = users.find((user) => user.id === userId);
  const album = albums.find((album) => album.id === albumId);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    if (user) {
      navigation.setOptions({ title: `${user.name} album` });
    }
  }, [user, album]);

  const fetchImages = async () => {
    setIsLoading(true);
    try {
      const res = await unsplashApi.getRandom({ count: 1 });
      setImages(
        res.map((random) => ({
          description: random.description ?? 'No description',
          url: random.urls.full,
        })),
      );
    } catch (e) {
      alert('Cannot fetch user`s album');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (!images.length) {
      void fetchImages();
    }
  }, [images]);

  if (!user) {
    return <Text>Unable to load user</Text>;
  }

  if (!album) {
    return <Text>Unable to load {user.name}`s album</Text>;
  }

  return isLoading ? (
    <Spinner flex={1} />
  ) : (
    <VStack>
      <Center m={10}>
        <Heading>{album.title}</Heading>
      </Center>
      <FlatList
        refreshing={isLoading}
        onRefresh={fetchImages}
        data={images}
        ListEmptyComponent={<NoDataFiller />}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item: image }) => <ImageListItem image={image} />}
      />
    </VStack>
  );
};
