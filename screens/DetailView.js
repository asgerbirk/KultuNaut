import * as React from 'react';
import {TextInput, View, Image, StyleSheet, Button, Text} from "react-native";

export const DetailView = () => {
    const [dateText, setDateText] = useState();
    const [headlineText, setHeadlineText] = useState();
    const [locationText, setLocationText] = useState();
    const [addressText, setAddressText] = useState();
    const [descriptionText, setDescriptionText] = useState();
    const [imagePath, setImagePath] = useState();

    const fetchData = async () => {

    }

    return(
    <View>
        <Image source={{uri: imagePath}}/>
        <Text>{headlineText}</Text>
        <Text>{locationText}</Text>
        <Text>{addressText}</Text>
        <Text>{dateText}</Text>
        
        <Text>Begivenheden</Text>
        <Text>{descriptionText}</Text>
    </View>
    )
}