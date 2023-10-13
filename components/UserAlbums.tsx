import * as React from "react";
import {FC, useContext, useEffect, useMemo, useState} from "react";
import {FlatList, Text} from "react-native";
import {Divider, Spinner} from "native-base";
import {NoDataFiller} from "./NoDataFiller";
import {AlbumListItem} from "./AlbumListItem";
import {CompositeScreenProps} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {AppStore, MainTabParamList, UsersParamsList} from "../App";
import {Album} from "../types/types";

type UserAlbumsProps = CompositeScreenProps<
    NativeStackScreenProps<UsersParamsList, 'UserAlbums'>,
    BottomTabScreenProps<MainTabParamList>
>;
export const UserAlbums: FC<UserAlbumsProps> = ({route, navigation}) => {
    const {userId} = route.params;
    const {albums, setAlbums, users} = useContext(AppStore)!;
    const user = useMemo(() => users.find((user) => user.id === userId), [users]);
    const [isLoadingAlbums, setIsLoadingAlbums] = useState<boolean>(false);

    const fetchAlbums = async () => {
        setIsLoadingAlbums(true);
        try {
            const fetchedAlbums: Album[] = await fetch(
                `https://jsonplaceholder.typicode.com/albums?userId=${userId}`,
            ).then((response) => response.json());
            setAlbums(fetchedAlbums);
        } catch (error) {
            alert("Cannot fetch user's albums");
        } finally {
            setIsLoadingAlbums(false);
        }
    };

    useEffect(() => {
        if (user) {
            navigation.setOptions({title: `${user.name}'s Albums`});
            void fetchAlbums();
        }
    }, [user]);

    if (!user) {
        return <Text>Unable to load user</Text>;
    }

    return isLoadingAlbums ? (
        <Spinner flex={1}/>
    ) : (
        <FlatList
            refreshing={isLoadingAlbums}
            onRefresh={fetchAlbums}
            style={{flex: 1}}
            data={albums}
            ItemSeparatorComponent={() => <Divider/>}
            ListEmptyComponent={<NoDataFiller/>}
            renderItem={({item: album}) => (
                <AlbumListItem key={album.id} album={album}/>
            )}
        />
    );
};
