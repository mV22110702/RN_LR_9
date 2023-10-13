import * as React from "react";
import {FC} from "react";
import {User} from "../types/types";
import {useNavigation} from "@react-navigation/native";
import {Text, TouchableOpacity} from "react-native";
import {VStack} from "native-base";
import {UserHomeNavigationProp} from "./UsersHome";

export const UserListItem: FC<{ user: User }> = ({user}) => {
    const navigation = useNavigation<UserHomeNavigationProp>();
    const handlePress = () => {
        navigation.navigate('UserAlbums', {userId: 1});
    };
    return (
        <TouchableOpacity onPress={handlePress}>
            <VStack space={5} pl={5} py={3} backgroundColor={'white'}>
                <Text>{user.name}</Text>
                <Text>{user.email}</Text>
            </VStack>
        </TouchableOpacity>
    );
};
