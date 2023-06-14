import React, {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const LikedEventsContext = React.createContext();

export const LikedEventsProvider = ({children}) => {
    const [likedEvents, setLikedEvents] = useState([])

    const toggleLike = async (event) => {
        //tjekker hvis det allerede er liked. Some er en javascript metode der returnere true eller false.
        //some tjekker hvis event allerede eksitere i likedEvents. den returnere true  hvis evented er allerde liket og false hvis event ikke er liket.
        const isAlreadyLiked = likedEvents.some((likedEvent) => likedEvent.Id === event.Id);

        let newLikedEvents;
        if (isAlreadyLiked) {
            newLikedEvents = likedEvents.filter((likedEvent) => likedEvent.Id !== event.Id)
        } else {
            //hvis eventet ikke er liket, så bliver det liket
            newLikedEvents = [...likedEvents, event]
        }
        try {
            await AsyncStorage.setItem("likedEvents", JSON.stringify(newLikedEvents))
            setLikedEvents(newLikedEvents)
        } catch (err) {
            console.log(err)
        }
    }

    const fetchLikedEvents = async () => {
        try {
            const storedEvents = await AsyncStorage.getItem("likedEvents");
            let events;
            if (storedEvents) {
                events = JSON.parse(storedEvents);
            } else {
                events = [];
            }
            setLikedEvents(events)
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchLikedEvents();
    },[]);

    return(
        <LikedEventsContext.Provider value={{likedEvents, toggleLike}}>
            {children}
        </LikedEventsContext.Provider>
    )

}