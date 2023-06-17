import * as React from 'react';
import {View, Text, StyleSheet} from "react-native";
import {SearchComponent} from "../components/SearchBar";


export const AllEvents = () => {

    return(<View>
        <Text>Search for events!</Text>
        <SearchComponent/>
        </View>)
}