import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useContext } from 'react';
import {LikedEventsContext} from "../context/LikedEventsContext";
import Icon from "react-native-vector-icons/FontAwesome";

export const LikedEventsScreen = () => {
    const { likedEvents, toggleLike } = useContext(LikedEventsContext);

    const navigation = useNavigation();
    
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Detail Event View', { itemData: item })}>
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
                            <Icon name="heart" size={20} color="#900" />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
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
