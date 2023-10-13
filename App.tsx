import * as React from 'react';
import {createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useState} from 'react';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {NativeBaseProvider,} from 'native-base';
import {createBottomTabNavigator,} from '@react-navigation/bottom-tabs';
import FontAwesomeIcon from '@expo/vector-icons/FontAwesome';
import {Random} from 'unsplash-js/src/methods/photos/types';
import {MyProfileScreen} from "./components/MyProfileScreen";
import {Album, User} from "./types/types";
import {UsersHome} from "./components/UsersHome";
import {UserAlbums} from "./components/UserAlbums";
import {UserAlbum} from "./components/UserAlbum";



export type UsersParamsList = {
  UsersHome: undefined;
  UserAlbums: { userId: number };
  UserAlbum: { userId: number; albumId: number };
};
const UsersScreenStack = createNativeStackNavigator<UsersParamsList>();

const UsersScreen = () => {
  return (
    <UsersScreenStack.Navigator>
      <UsersScreenStack.Screen
        options={{ title: 'Users' }}
        name={'UsersHome'}
        component={UsersHome}
      />
      <UsersScreenStack.Screen
        options={{ title: 'User`s albums' }}
        name={'UserAlbums'}
        component={UserAlbums}
      />
      <UsersScreenStack.Screen
        options={{
          title: 'User`s Album',
          contentStyle: { backgroundColor: 'white' },
        }}
        name={'UserAlbum'}
        component={UserAlbum}
      />
    </UsersScreenStack.Navigator>
  );
};

export type MainTabParamList = {
  Users: NavigatorScreenParams<UsersParamsList>;
  Profile: undefined;
};
const MainBottomTab = createBottomTabNavigator<MainTabParamList>();

export const AppStore = createContext<{
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  albums: Album[];
  setAlbums: Dispatch<SetStateAction<Album[]>>;
  currentUser: User | null;
  setCurrentUser: Dispatch<SetStateAction<User | null>>;
} | null>(null);

const AppStoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <AppStore.Provider
      value={{
        users,
        setUsers,
        albums,
        setAlbums,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AppStore.Provider>
  );
};

export default function App() {
  return (
    <AppStoreProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <MainBottomTab.Navigator
            screenOptions={({ route }) => ({
              tabBarLabelStyle: { fontSize: 20 },
              headerShown: route.name !== 'Users',
            })}
          >
            <MainBottomTab.Screen
              options={{
                tabBarLabel: 'Users',
                tabBarIcon: () => (
                  <FontAwesomeIcon name={'users'} style={{ fontSize: 20 }} />
                ),
              }}
              name="Users"
              component={UsersScreen}
            />
            <MainBottomTab.Screen
              options={{
                tabBarLabel: 'My Profile',
                title: 'My Profile',
                tabBarIcon: () => (
                  <FontAwesomeIcon name={'user'} style={{ fontSize: 20 }} />
                ),
              }}
              name="Profile"
              component={MyProfileScreen}
            />
          </MainBottomTab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AppStoreProvider>
  );
}
