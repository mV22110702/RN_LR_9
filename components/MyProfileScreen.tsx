import * as React from "react";
import {FC, useContext, useEffect, useState} from "react";
import {Heading, Image, Spinner, VStack} from "native-base";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {AppStore, MainTabParamList} from "../App";
import {User} from "../types/types";

export type MyProfileScreenProps = BottomTabScreenProps<MainTabParamList, 'Profile'>;

export const MyProfileScreen: FC<MyProfileScreenProps> = () => {
    const {currentUser, setCurrentUser} = useContext(AppStore)!;
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    const fetchCurrentUser = async () => {
        setIsLoading(true);
        try {
            const [fetchedCurrentUser]: User[] = await fetch(
                'https://jsonplaceholder.typicode.com/users',
            ).then((response) => response.json());

            const randomId = Math.floor(Math.random() * 54);
            setAvatarUrl(
                `https://xsgames.co/randomusers/assets/avatars/pixel/${randomId}.jpg`,
            );
            setCurrentUser(fetchedCurrentUser);
        } catch (e) {
            alert('Cannot fetch current user');
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        void fetchCurrentUser();
    }, []);

    if (isError && !currentUser) {
        return <Heading>Cannot load current user</Heading>;
    }
    return isLoading ? (
        <Spinner flex={1}/>
    ) : (
        <VStack space={10} flex={1} justifyContent={'center'} alignItems={'center'}>
            {avatarUrl ? (
                <Image source={{uri: avatarUrl}} size={300} alt={'avatar'}/>
            ) : (
                <Heading>No avatar available</Heading>
            )}
            <Heading>Name:{currentUser?.name}</Heading>
            <Heading>Email:{currentUser?.email}</Heading>
        </VStack>
    );
};
