import React, {useContext, useEffect, useState} from "react";
import {API_KEY} from "react-native-dotenv";
import {getToken} from "../lib/authToken";
import {Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {LikedEventsContext} from "../context/LikedEventsContext";
import Icon from "react-native-vector-icons/FontAwesome";
import {DatePicker} from "./DatePicker";


export const SearchComponent = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [ids, setIds] = useState("");

    const {likedEvents, toggleLike} = useContext(LikedEventsContext); // Use the context
    const [displayData, setDisplayData] = useState([]);

    const [token, setToken] = useState("");

    const [selectedDate, setSelectedDate] = useState(new Date());

    const onDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect( () => {
        const fetchToken = async() => {
            const token = await getToken();
            setToken(token);
        }
        fetchToken();
    }, []);


    const apiKey = encodeURIComponent(API_KEY)


    const cities = ['Roskilde', 'København', 'Nakskov', 'Århus', 'Odense', 'Randers', 'Esbjerg'];

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
                    console.error('Fejl test test:', error);
                });
        }
    }, [selectedCity]);

/*
    useEffect(() => {
        const url = `https://www.kultunaut.dk/perl/api2/EventId?Id=${ids}`;

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {

                const dataToDisplay = data.result.map(item => ({
                    ...item,
                    isLiked: likedEvents.some(likedEvent => likedEvent.Id === item.id)
                }));
                setDisplayData(dataToDisplay);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [ids]);


 */

    const handleSearch = () => {
        if (selectedCity) {
            const radius = 1000;
            const url = `https://www.kultunaut.dk/perl/api2/EventLonLatDate?lat=${latitude}&lon=${longitude}&radius=${radius}&fieldlist=Changed`;

            fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    const ids = data.result.map(item => item.Id);
                    const idsComma = ids.join(",");

                    const secondUrl = `https://www.kultunaut.dk/perl/api2/EventId?Id=${idsComma}`;
                    return fetch(secondUrl, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    })
                })
                .then(response => response.json())
                .then(data => {
                    const dataToDisplay = data.result.map(item => ({
                        ...item,
                        isLiked: likedEvents.some(likedEvent => likedEvent.Id === item.id)
                    }));
                    setDisplayData(dataToDisplay);
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

    const renderItem = ({ item }) => {
        return (
            <View className="p-1.5 bg-gray-800">
                <View className="p-2.5 bg-white">
                    <Text className="font-bold text-sm">{item.Tags + " -"}</Text>
                    <View className="flex-row">
                        <Text className="">{item.Startdate + ","}</Text>
                        <Text className="font-bold"> {item.LocationName} </Text>
                    </View>
                    <Text className="font-bold text-base">{item.Title}</Text>
                    <Image source={{ uri: item.Image }} className="h-44 w-full" resizeMode={"cover"} />
                    <TouchableOpacity className="absolute top-4 right-4 bg-gray-400 p-2 rounded" onPress={() => toggleLike(item)}>
                        <Icon name={item.isLiked ? "heart" : "heart-o"} size={20} color={item.isLiked ? "#900" : "#000"} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if(displayData.length === 0) {
        return (
        <View>
            <Text>Vælg by:</Text>
            <SelectDropdown
                data={cities}
                onSelect={(selectedItem) => setSelectedCity(selectedItem)}
                defaultValue={'Vælg en by'}
                buttonTextAfterSelection={(selectedItem) => selectedItem}
                rowTextForSelection={(item) => item}
                buttonStyle={{backgroundColor: '#DDDDDD'}}
                buttonTextStyle={{color: '#000000'}}
                dropdownStyle={{backgroundColor: '#FFFFFF'}}
                rowStyle={{backgroundColor: '#FFFFFF'}}
                rowTextStyle={{color: '#000000'}}
            />
            <DatePickerComponent />
            <View>
                <Button title="Søg" color="#22293C" onPress={handleSearch}/>
            </View>
            <Text>Ingen begivenheder</Text>
        </View>
    )
    }else {
        return (
            <View>
                <Text>Vælg by:</Text>
                <SelectDropdown
                    data={cities}
                    onSelect={(selectedItem) => setSelectedCity(selectedItem)}
                    defaultValue={'Vælg en by'}
                    buttonTextAfterSelection={(selectedItem) => selectedItem}
                    rowTextForSelection={(item) => item}
                    buttonStyle={{backgroundColor: '#DDDDDD'}}
                    buttonTextStyle={{color: '#000000'}}
                    dropdownStyle={{backgroundColor: '#FFFFFF'}}
                    rowStyle={{backgroundColor: '#FFFFFF'}}
                    rowTextStyle={{color: '#000000'}}
                />
                <View>
                    <Button title="Søg" color="#22293C" onPress={handleSearch}/>
                </View>
                <FlatList
                    data={displayData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.Id.toString()}
                />
            </View>
        )}
}