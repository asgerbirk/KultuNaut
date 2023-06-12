import { Text, View, FlatList, Image } from 'react-native';
import { useContext } from 'react';
import {LikedEventsContext} from "../context/LikedEventsContext";

export const LikedEventsScreen = () => {
    const { likedEvents } = useContext(LikedEventsContext);

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
                </View>
            </View>
        );
    };

    return (
        <FlatList
            data={likedEvents}
            renderItem={renderItem}
            keyExtractor={(item) => item.Id}
        />
    );
};
