import {Text, View, FlatList, Image, TouchableOpacity} from "react-native";
import data from "../utils/dummyData";
import Icon from 'react-native-vector-icons/FontAwesome';
import {useState} from "react";


export const EventComponent = () => {


    //initializes dummyData state. tilføjer isLiked prop til hver element som er sat til falsk(ingen farve)
    const [dummyData, setDummyData] = useState(
        data.result.map(item => ({ ...item, isLiked: false }))
    );

    //denne her function bliver kaldt når iconet bliver trykket på
    const toggleLike = id => {
        setDummyData(
            dummyData.map(item =>
                item.Id === id ? { ...item, isLiked: !item.isLiked } : item
            )
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
                <Image source={{uri: item.Image}} className="h-44 w-full" resizeMode={"cover"}/>
                    <TouchableOpacity className="absolute top-4 right-4 bg-gray-400 p-2 rounded" onPress={() => toggleLike(item.Id)}>
                        <Icon name={item.isLiked ? "heart" : "heart-o"} size={20} color={item.isLiked ? "#900" : "#000"} />

                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    //<Icon name={item.isLiked ? "heart" : "heart-o"} size={20} color={item.isLiked ? "#900" : "#000"} />
    //hvis item.Isliked så er den true og viser hjerte og hvis item.isLikes viser den det modsatte.


return(
    <FlatList
        data={dummyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id.toString()}
    />
)
}