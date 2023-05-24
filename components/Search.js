import React, {useEffect, useState} from 'react';
import { View, Text, Button } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {DatePicker} from "./DatePicker";

export const SearchBarComponent = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");

    const cities = ['Roskilde', 'København', 'Nakskov'];

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

    const handleSearch = () => {
        if (selectedCity) {
            const radius = 1000; // Radius parameter (skift til den ønskede standardværdi)

            const url = `https://www.kultunaut.dk/perl/api2/EventLonLatDate?lat=${latitude}&lon=${longitude}&radius=${radius}`;
            console.log(url)

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    // Behandle resultatet fra slut-API'en
                    console.log('Resultater:', data);
                    // Opdater din tilstandsvariabel eller udfør andre handlinger med resultatet
                })
                .catch(error => {
                    console.error('Fejl:', error);
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

            <Button title="Søg" onPress={handleSearch} />
        </View>
    );
};
