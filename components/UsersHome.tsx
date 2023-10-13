import * as React from "react";
import {FC, useContext, useEffect, useState} from "react";
import {User} from "../types/types";
import {Divider, Spinner} from "native-base";
import {FlatList} from "react-native";
import {NoDataFiller} from "./NoDataFiller";
import {UserListItem} from "./UserListItem";
import {CompositeNavigationProp, CompositeScreenProps} from "@react-navigation/native";
import {NativeStackNavigationProp, NativeStackScreenProps} from "@react-navigation/native-stack";
import {BottomTabNavigationProp, BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {AppStore, MainTabParamList, UsersParamsList} from "../App";

export type UserHomeNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<UsersParamsList, 'UsersHome'>,
    BottomTabNavigationProp<MainTabParamList>
>;

type UserHomeProps = CompositeScreenProps<
    NativeStackScreenProps<UsersParamsList, 'UsersHome'>,
    BottomTabScreenProps<MainTabParamList>
>;

export const UsersHome: FC<UserHomeProps> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {users, setUsers} = useContext(AppStore)!;

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const fetchedUsers: User[] = await fetch(
                'https://jsonplaceholder.typicode.com/users',
            ).then((response) => response.json());
            setUsers(fetchedUsers);
        } catch (error) {
            alert('Cannot fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        void fetchUsers();
    }, []);

    return isLoading ? (
        <Spinner flex={1}/>
    ) : (
        <FlatList
            refreshing={isLoading}
            onRefresh={fetchUsers}
            style={{flex: 1}}
            data={users}
            ItemSeparatorComponent={() => <Divider/>}
            ListEmptyComponent={<NoDataFiller/>}
            renderItem={({item: user}) => (
                <UserListItem key={user.id} user={user}/>
            )}
        />
    );
};
