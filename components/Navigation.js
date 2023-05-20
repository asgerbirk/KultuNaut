import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {HomeScreen} from "../screens/HomeScreen";
import {AllEvents} from "../screens/AllEvents";
import {DetailView} from "../screens/DetailView";

const Stack = createStackNavigator();
export const Navigation = () => {



     return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="All upcoming Events" component={AllEvents} />
                <Stack.Screen name="Detail Event View" component={DetailView}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}


