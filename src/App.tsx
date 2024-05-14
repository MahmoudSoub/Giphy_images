import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SearchScreen from './screens/SearchScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import ItemDetails from './screens/ItemDetailsScreen';
import {StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from './store/store';
import {RootStackParamList, RootTabParamList} from './types/types';
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Details"
        component={ItemDetails}
        options={{
          headerShown: false,
          title: 'About',
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
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
  const {favoriteItems} = useSelector((state: RootState) => state.FavoriteGifs);
  const {isSignedIn} = useSelector((state: RootState) => state.Auth);
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

export default App;
