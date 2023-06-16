import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {AllEvents} from "../screens/AllEvents";
import {DetailView} from "../screens/DetailView";
import {Home} from "../screens/Home";
import {EventComponent} from "./EventComponent";
import {LikedEventsProvider} from "../context/LikedEventsContext";
import {LikedEventsScreen} from "../screens/LikedEventsScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SearchEvent } from '../screens/SearchEvent';
import {EventScreen} from "../screens/EventScreen";

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator()


    function HomeStack() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
                <Stack.Screen name="All upcoming Events" component={AllEvents}  options={{ headerShown: false }}/>
                <Stack.Screen name="Detail Event View" component={DetailView}  options={{  headerTitle: ''}} />
                <Stack.Screen name="Event screen" component={EventScreen}  options={{ headerShown: false }}/>
                <Stack.Screen name="Liked events" component={LikedEventsScreen}  options={{ headerShown: false }}/>
                <Stack.Screen name="Search Event" component={SearchEvent}  options={{ headerShown: false }}/>
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

                            if (route.name === 'HomeScreen') {
                                iconName = focused ? 'home' : 'home-outline';
                            } else if (route.name === 'Event screen') {
                                iconName = focused ? 'calendar' : 'calendar-outline';
                            } else if (route.name === 'Liked events') {
                                iconName = focused ? 'heart' : 'heart-outline';
                            }else if (route.name === "Search Event"){
                                iconName = focused ? "search" : "search-outline"
                            }

                            return <Ionicons name={iconName} size={size} color={color} />;
                        },

                    })}>
                        <BottomTab.Screen name="HomeScreen" component={HomeStack} options={{ tabBarLabel: 'Hjem', headerTitle: ""}} />
                        <BottomTab.Screen name="Event screen" component={EventScreen} options={{ tabBarLabel: ' Begivenheder', headerTitle: "" }} />
                        <BottomTab.Screen name="Liked events" component={LikedEventsScreen} options={{ tabBarLabel: 'Dine begivenheder', headerTitle: "" }} />
                        <BottomTab.Screen name="Search Event" component={SearchEvent} options={{ tabBarLabel: 'Søg', headerTitle: "" }} />
                    </BottomTab.Navigator>
                </NavigationContainer>
            </LikedEventsProvider>
        );
    }



