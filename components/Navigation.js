import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AllEvents} from "../screens/AllEvents";
import {DetailView} from "../screens/DetailView";
import {Home} from "../screens/Home";
import {EventComponent} from "./EventComponent";
import {LikedEventsProvider} from "../context/LikedEventsContext";
import {LikedEventsScreen} from "../screens/LikedEventsScreen";
import { SearchEvent } from '../screens/SearchEvent';

const Stack = createStackNavigator();
export const Navigation = () => {



     return (
         <LikedEventsProvider>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="All upcoming Events" component={AllEvents} />
                <Stack.Screen name="Detail Event View" component={DetailView}/>
                
                <Stack.Screen name="HomeTwo" component={Home} />
                <Stack.Screen name="Events component" component={EventComponent} />
                <Stack.Screen name="Liked events" component={LikedEventsScreen} />
                <Stack.Screen name="Search Event" component={SearchEvent} />
            </Stack.Navigator>
        </NavigationContainer>
         </LikedEventsProvider>
    );
}


