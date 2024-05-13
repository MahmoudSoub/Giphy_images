import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import AntDesign from 'react-native-vector-icons/AntDesign';

import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import ItemDetails from './src/screens/ItemDetailsScreen';

import {StatusBar, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';

const Tab = createBottomTabNavigator();
const SharedStack = createSharedElementStackNavigator();
const Stack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <SharedStack.Navigator initialRouteName="Home">
      <SharedStack.Screen name="Home" component={HomeScreen} />
      <SharedStack.Screen
        name="Details"
        component={ItemDetails}
        options={{
          headerShown: false,
          title: 'About',
          presentation: 'modal',
        }}
        sharedElements={(route, otherRoute, showing) => {
          const {item} = route.params;
          return [`${item.id}`];
        }}
      />
    </SharedStack.Navigator>
  );
}

function SearchStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen
        name="Details"
        component={ItemDetails}
        options={{headerShown: false, title: 'About'}}
      />
    </Stack.Navigator>
  );
}

function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Details"
        component={ItemDetails}
        options={{headerShown: false, title: 'About'}}
      />
    </Stack.Navigator>
  );
}

function App() {
  const {favoriteItems} = useSelector((state: any) => state.favoriteGIFS);
  const {isSignedIn} = useSelector((state: any) => state.Auth);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator>
          {isSignedIn ? (
            <>
              <Tab.Screen
                name="HomeStack"
                component={HomeStackNavigator}
                options={{
                  headerShown: false,
                  title: 'Home',
                  tabBarIcon: () => (
                    <AntDesign name="home" size={24} color="black" />
                  ),
                }}
              />
              <Tab.Screen
                name="FavoriteStack"
                component={FavoriteStack}
                options={{
                  tabBarIcon: () => (
                    <AntDesign name="hearto" size={24} color="black" />
                  ),
                  title: 'Favorites',
                  headerShown: false,
                  tabBarBadge:
                    favoriteItems.length > 0 ? favoriteItems.length : undefined,
                  tabBarBadgeStyle: {backgroundColor: 'red'},
                }}
              />
              <Tab.Screen
                name="SearchStack"
                component={SearchStackNavigator}
                options={{
                  headerShown: false,
                  tabBarIcon: () => (
                    <AntDesign name="search1" size={24} color="black" />
                  ),
                  title: 'Search',
                }}
              />
            </>
          ) : (
            <Tab.Screen
              name="SignIn"
              component={SignInScreen}
              options={{tabBarStyle: {display: 'none'}, headerShown: false}}
            />
          )}
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
