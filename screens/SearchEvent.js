import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TextInput, Button, SelectDropdown} from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import { DatePicker } from '../components/DatePicker';
import { MaterialIcons } from '@expo/vector-icons';
import data from "../utils/dummyData";

export const SearchEvent = () => {
    const [searchBarText, setSearchBarText] = useState('');
    const [selectedZipCode, setSelectedZipCode] = useState('');
    const [zipCodes, setZipCodes] = useState([]);
    //const filteredData = data.filter(item => item.toLowerCase().includes(searchBarText.toLowerCase()));

    useEffect(() => {
      const transformedData = data.map(item => ({
        nr: item.nr,
        visueltcenter: item.visueltcenter,
        navn: item.navn
      }));
      setZipCodes(transformedData);

    }, [zipCodes])
    const zipCodeDropdown = zipCodes.map(zipCode => zipCode.nr);
    console.log(zipCodeDropdown);
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
        <View>
        <SelectDropdown
            data={zipCodeDropdown}
            onSelect={(selectedItem) => {
              setSelectedZipCode(selectedItem)
            }}
            buttonTextAfterSelection={(selectedItem) => {
              return selectedItem
            }}
            rowTextForSelection={(item) => {
              return item
            }}
          />
        </View>
          <View className="mb-3">
                <Button title="Søg" color="#22293C" />
          </View>
    </View>
  );
}