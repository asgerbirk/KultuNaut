import React, { useContext } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LikedEventsContext } from "../context/LikedEventsContext";
import { useNavigation } from "@react-navigation/native";

export const EventComponent = ({ item }) => {
    const navigation = useNavigation();
    const { toggleLike } = useContext(LikedEventsContext);

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Detail Event View', { eventId: item.Id, itemData: item })}>
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
        </TouchableOpacity>
    );
};

