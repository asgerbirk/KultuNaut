import React, {useState} from "react";
export const LikedEventsContext = React.createContext();

export const LikedEventsProvider = ({children}) => {
    const [likedEvents, setLikedEvents] = useState([])

    const toggleLike = (event) => {
        //tjekker hvis det allerede er liked. Some er en javascript metode der returnere true eller false.
        //some tjekker hvis event allerede eksitere i likedEvents. den returnere true  hvis evented er allerde liket og false hvis event ikke er liket.
        const isAlreadyLiked = likedEvents.some((likedEvent) => likedEvent.Id === event.Id);

        let newLikedEvents;
        if (isAlreadyLiked){
            newLikedEvents = likedEvents.filter((likedEvent) => likedEvent.Id !== event.Id)
        }else {
            //hvis eventet ikke er liket, så bliver det liket
            newLikedEvents = [...likedEvents, event]
        }
        setLikedEvents(newLikedEvents)
    }

    return(
        <LikedEventsContext.Provider value={{likedEvents, toggleLike}}>
            {children}
        </LikedEventsContext.Provider>
    )

}