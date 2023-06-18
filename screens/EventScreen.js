import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { LikedEventsContext } from "../context/LikedEventsContext";
import {EventComponent} from "../components/EventComponent";
import {getToken} from "../lib/authToken";

export const EventScreen = () => {
    const { likedEvents } = useContext(LikedEventsContext);

    const [displayData, setDisplayData] = useState([]);
    const [ids, setIds] = useState("");

    const [token, setToken] = useState("");

    useEffect( () => {
        const fetchToken = async() => {
            const token = await getToken();
            setToken(token);
        }
        fetchToken();
    }, []);

    useEffect( () => {
        if (token) {
            const url = "https://www.kultunaut.dk/perl/api2/EventLonLatDate?lat=55.6401&lon=12.0741&radius=1000&page=1&pagesize=30&fieldlist=Startdate"

            fetch(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                const ids = data.result.map(item => item.Id);
                const idsComma = ids.join(",");
                setIds(idsComma);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }, [token]);


    useEffect(() => {
        const url = `https://www.kultunaut.dk/perl/api2/EventId?Id=${ids}`;

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                if(data.result) {
                    const dataToDisplay = data.result.map(item => ({
                        ...item,
                        isLiked: likedEvents.some(likedEvent => likedEvent.Id === item.Id)
                    }));
                    setDisplayData([...dataToDisplay].reverse());

                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, [ids, token]);

    useEffect(() => {
        const updateLike = displayData.map(item => ({
            ...item,
            isLiked: likedEvents.some(likedEvent => likedEvent.Id === item.Id)
        }));
        setDisplayData(updateLike);
    }, [likedEvents]);

    return (
        <FlatList
            data={displayData}
            renderItem={({ item }) => <EventComponent item={item} />}
            keyExtractor={(item) => item.Id.toString()}
        />
    );
}



