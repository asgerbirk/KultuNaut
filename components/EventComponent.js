import { Text, View, FlatList, Image, TouchableOpacity } from "react-native";
import data from "../utils/dummyData";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useContext } from "react";
import {LikedEventsContext} from "../context/LikedEventsContext";

export const EventComponent = () => {
    const { likedEvents, toggleLike } = useContext(LikedEventsContext); // Use the context

    // Adds isLiked prop to each item in the data array
    const displayData = data.result.map(item => ({
        ...item,
        isLiked: likedEvents.some(likedEvent => likedEvent.Id === item.Id)
    }));

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
                    <Image source={{uri: item.Image}} className="h-44 w-full" resizeMode={"cover"}/>
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
}
