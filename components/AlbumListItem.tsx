import * as React from "react";
import {FC} from "react";
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity} from "react-native";
import {VStack} from "native-base";
import {Album} from "../types/types";
import {UserHomeNavigationProp} from "./UsersHome";

export const AlbumListItem: FC<{ album: Album }> = ({album}) => {
    const navigation = useNavigation<UserHomeNavigationProp>();
    const handlePress = () => {
        navigation.navigate('UserAlbum', {
            userId: album.userId,
            albumId: album.id,
        });
    };
    return (
        <TouchableOpacity onPress={handlePress}>
            <VStack py={5} pl={5} backgroundColor={'white'}>
                <Text>{album.title}</Text>
            </VStack>
        </TouchableOpacity>
    );
};
