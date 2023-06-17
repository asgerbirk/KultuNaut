import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {AllEvents} from "../screens/AllEvents";
import {DetailView} from "../screens/DetailView";
import {Home} from "../screens/Home";
import {EventScreen} from "../screens/EventScreen";
import {LikedEventsProvider} from "../context/LikedEventsContext";
import {LikedEventsScreen} from "../screens/LikedEventsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import {SearchComponent} from "./SearchBar";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator()

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="All upcoming Events" component={AllEvents} />
            <Stack.Screen name="Detail Event View" component={DetailView} />
        </Stack.Navigator>
    );
}

function EventStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Event screen" component={EventScreen}/>
            <Stack.Screen name="Detail Event View" component={DetailView}/>
        </Stack.Navigator>
    );
}

function LikedEventsStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Liked events" component={LikedEventsScreen}/>
            <Stack.Screen name="Detail Event View" component={DetailView}/>
        </Stack.Navigator>
    );
}

function SearchEventStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search Event" component={SearchComponent}/>
            <Stack.Screen name="Detail Event View"  component={DetailView}/>
        </Stack.Navigator>
    );
}

export const Navigation = () => {
    return (
        <LikedEventsProvider>
            <NavigationContainer>
                <BottomTab.Navigator screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'HomeStack') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'EventStack') {
                            iconName = focused ? 'calendar' : 'calendar-outline';
                        } else if (route.name === 'LikedEventsStack') {
                            iconName = focused ? 'heart' : 'heart-outline';
                        } else if (route.name === 'SearchEventStack'){
                            iconName = focused ? "search" : "search-outline"
                        }
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },

                })}>
                    <BottomTab.Screen name="HomeStack" component={HomeStack} options={{ tabBarLabel: 'Hjem', headerTitle: ""}} />
                    <BottomTab.Screen name="EventStack" component={EventStack} options={{ tabBarLabel: ' Begivenheder', headerTitle: "" }} />
                    <BottomTab.Screen name="LikedEventsStack" component={LikedEventsStack} options={{ tabBarLabel: 'Dine begivenheder', headerTitle: "" }} />
                    <BottomTab.Screen name="SearchEventStack" component={SearchEventStack} options={{ tabBarLabel: 'Søg', headerTitle: "" }} />
                </BottomTab.Navigator>
            </NavigationContainer>
        </LikedEventsProvider>
    );
}