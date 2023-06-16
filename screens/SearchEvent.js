import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput} from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { DatePicker } from '../components/DatePicker';
import { MaterialIcons } from '@expo/vector-icons'; 

export const SearchEvent = () => {
    const [searchBarText, setSearchBarText] = useState('');
    const [data, setData] = useState(['Apple', 'Banana', 'Orange', 'Strawberry', 'Mango']);

    const filteredData = data.filter(item => item.toLowerCase().includes(searchBarText.toLowerCase()));

  return (
    <View className="flex p-5">
        <View className="flex-row border mb-5 rounded-lg h-10 items-center">
            <EvilIcons name="search" size={24} color="black"/>
            <TextInput
                onChangeText={text => setSearchBarText(text)}
                value={searchBarText}
                placeholder="Search here"
                className="flex-grow"
            />
        </View>
        <View className="flex-row">
                <DatePicker />
                <MaterialIcons name="arrow-right-alt" size={24} color="black"/>
                <DatePicker />
        </View>
      <FlatList
        data={filteredData}
        keyExtractor={item => item}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
    </View>
  );
}