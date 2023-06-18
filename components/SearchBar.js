import React, {useContext, useEffect, useState} from "react";
import {API_KEY} from "react-native-dotenv";
import {getToken} from "../lib/authToken";
import {Button, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import {LikedEventsContext} from "../context/LikedEventsContext";
import Icon from "react-native-vector-icons/FontAwesome";
import {DatePicker} from "./DatePicker";
import logo from '../assets/kultunaut_logo.png';



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
    const emptyDisplayData = () => {
        setDisplayData([]);
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
        <View className="bg-primary flex-1">
            <View className="flex flex-col items-center mt-8">
                <Text className="text-4xl text-slate-200 font-bold">Søg efter begivenheder</Text>
                    <Image 
                    source={logo}
                    resizeMode='contain'
                    className="w-80 h-28 my-7"
                    />
            </View>
            <View className="w-full items-center justify-center">
                <SelectDropdown
                    data={cities}
                    onSelect={(selectedItem) => setSelectedCity(selectedItem)}
                    defaultButtonText={'Vælg en by'}
                    buttonTextAfterSelection={(selectedItem) => selectedItem}
                    rowTextForSelection={(item) => item}
                />
            </View>
            <View className="justify-center items-center mt-2">
                <Text className="text-slate-200 text-lg font-bold">Vælg en dato:</Text>
            </View>
            <DatePickerComponent />
            <TouchableOpacity className="bg-slate-200 p-3 justify-center items-center w-fit left-0 right-0 absolute bottom-0 self-end" onPress={handleSearch}>
                <Text className="text-black text-xl font-bold">Søg</Text>
            </TouchableOpacity>
        </View>
    )
    }else {
        return (
            <View className="bg-primary flex-1">
                <FlatList
                    data={displayData}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.Id.toString()}
                />

                    <TouchableOpacity className="bg-slate-200 p-3 justify-center items-center" onPress={emptyDisplayData}>
                        <Text className="text-black text-xl font-bold">Søg igen</Text>
                    </TouchableOpacity>
            </View>
        )}
}