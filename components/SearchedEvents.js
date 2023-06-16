import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useContext, useEffect, useState } from "react";
import { LikedEventsContext } from "../context/LikedEventsContext";
import {getToken} from "../lib/authToken";


export const SearchedEvents = ({ data: ids }) => {
    const {likedEvents, toggleLike} = useContext(LikedEventsContext); // Use the context
    const [displayData, setDisplayData] = useState([]);
    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
            const token = await getToken();
            setToken(token);
        }
        fetchToken();
    }, []);


    useEffect(() => {
        const url = `https://www.kultunaut.dk/perl/api2/EventId?Id=${ids}`;
        console.log("URL til hentning af data: " + url);

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

    return (
        <FlatList
            data={displayData}
            renderItem={renderItem}
            keyExtractor={(item) => item.Id.toString()}
        />
    );
};