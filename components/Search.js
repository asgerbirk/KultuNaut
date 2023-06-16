import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {DatePicker} from "./DatePicker";
import {getToken} from "../lib/authToken";
import {API_KEY} from "react-native-dotenv";
import { SearchBar } from 'react-native-elements';

export const SearchBarComponent = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");

    const apiKey = encodeURIComponent(API_KEY)
    const cities = ['Roskilde', 'København', 'Nakskov'];
    const [searchBarText, setSearchBarText] = useState("");

    useEffect(() => {
        if (selectedCity) {
            const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${selectedCity}`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const { lat, lng } = data.results[0].locations[0].latLng;
                    setLatitude(lat);
                    setLongitude(lng);
                    console.log('Længdegrad:', lng);
                    console.log('Breddegrad:', lat);
                })
                .catch(error => {
                    console.error('Fejl:', error);
                });
        }
    }, [selectedCity]);

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    const [token, setToken] = useState("");

    useEffect( () => {
        const fetchToken = async() => {
            const token = await getToken();
            setToken(token);
        }
        fetchToken();
    }, []);

    const handleSearch = () => {
        if (selectedCity) {
            const radius = 1000; // Radius parameter (skift til den ønskede standardværdi)
            console.log(token);
            const url = `https://www.kultunaut.dk/perl/api2/EventLonLatDate?lat=${latitude}&lon=${longitude}&radius=${radius}&fieldlist=Changed`;
            console.log(url)

            fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    console.log('Results:', data);
                    // Update your state variable or perform other actions with the result
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const DatePickerComponent = () => {
        return (
            <DatePicker
                selectedDate={selectedDate}
                onDateChange={onDateChange}
            />
        );
    };

    return (
        <View>
            <Text>Vælg by:</Text>
            <SelectDropdown
                data={cities}
                onSelect={(selectedItem) => setSelectedCity(selectedItem)}
                defaultValue={'Vælg en by'}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                rowTextForSelection={(item) => item}
                buttonStyle={{ backgroundColor: '#DDDDDD' }}
                buttonTextStyle={{ color: '#000000' }}
                dropdownStyle={{ backgroundColor: '#FFFFFF' }}
                rowStyle={{ backgroundColor: '#FFFFFF' }}
                rowTextStyle={{ color: '#000000' }}
            />
            <DatePickerComponent />
            <View>
                <Button title="Søg" color="#22293C" onPress={handleSearch} />
            </View>
        </View>
    );
};
