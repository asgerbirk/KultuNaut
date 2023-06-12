import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AllEvents} from "../screens/AllEvents";
import {DetailView} from "../screens/DetailView";
import {Home} from "../screens/Home";
import {EventComponent} from "./EventComponent";

const Stack = createStackNavigator();
export const Navigation = () => {

     return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="All upcoming Events" component={AllEvents} />
                <Stack.Screen name="Detail Event View" component={DetailView}/>
                <Stack.Screen name="Events component" component={EventComponent} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


