import * as React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {SearchBarComponent} from "../components/Search";
import {EventComponent} from "../components/EventComponent";

export const AllEvents = () => {

    return(<View>
        <Text>Search for events!</Text>
        <SearchBarComponent/>
        </View>)
}