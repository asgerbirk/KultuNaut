import * as React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {SearchBarComponent} from "../components/Search";

export const AllEvents = () => {

    return(<View>
        <Text>Search for events!</Text>
        <SearchBarComponent/>
        </View>)
}