import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import { LikedEventsContext } from "../context/LikedEventsContext";
import data from "../utils/dummyData";
import {EventComponent} from "../components/EventComponent";


export const EventScreen = () => {
    const { likedEvents } = useContext(LikedEventsContext);

    // Adds isLiked prop to each item in the data array
    const displayData = data.result.map(item => ({
        ...item,
        isLiked: likedEvents.some(likedEvent => likedEvent.Id === item.Id)
    }));

    return (
        <FlatList
            data={displayData}
            renderItem={({ item }) => <EventComponent item={item} />} // Use the EventItem component to render items
            keyExtractor={(item) => item.Id.toString()}
        />
    );
}