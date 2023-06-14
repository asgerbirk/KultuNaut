import {Button, Modal, Text, View, Linking, Pressable, TouchableOpacity, Image} from "react-native";
import {useEffect, useState} from "react";
import * as Calendar from 'expo-calendar';
import {AntDesign} from '@expo/vector-icons';

const SaveToCalenderButton = (props) => {


    // MODAL
    const [noAccessCalendarModal, setNoAccessCalendarModal] = useState(false);
    const [chooseCalenderModal, setChooseCalenderModal] = useState(false);

    // CALENDAR
    const [userCalendars, setUserCalendars] = useState([]);
    const [chosenCalendar, setChosenCalendar] = useState({})

    // DOCS
    // https://docs.expo.dev/versions/latest/sdk/calendar/

    async function createBasicCalendar() {
        const details = {
            name: "Kulturnaut kalender",
            color: "blue",
            title: "Kulturnaut kalender",
            source: {
                name: "Kulturnaut",
                isLocalAccount: true
            },
            accessLevel: 'readWrite',
            ownerAccount: ""
        }
        const response = await Calendar.createCalendarAsync(details)
        return response
    }

    async function addEventToCalendar(calendar) {
        const eventInfo = props.event
        console.log(eventInfo)

        const eventData = {
            title: 'My Event',
            startDate: new Date(), // Set the start date of the event
            endDate: new Date(new Date().getTime() + 60 * 60 * 1000), // Set the end date of the event (1 hour after start)
            timeZone: 'Europe/Copenhagen', // Set the time zone
            location: 'New York',
            notes: 'This is a test event',
            alarms: [{ relativeOffset: -30 }],
        };





        //const response = await Calendar.createEventAsync(calendar.id, eventData)



    }


    function saveToCalender() {
        (async () => {
            const {status} = await Calendar.requestCalendarPermissionsAsync()
            if (status === 'granted') {
                const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);

                if (calendars.length !== 0) {
                    setUserCalendars(() => [...calendars])

                    setChooseCalenderModal(true)
                } else {
                    const response = await createBasicCalendar()
                    const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                    setUserCalendars(() => [...calendars])
                }
            } else if (status === "denied") {
                setNoAccessCalendarModal(true)
            }
        })()
    }

    return (
        <>
            {/* CHOOSE CALENDAR*/}
            <Modal
                visible={chooseCalenderModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setNoAccessCalendarModal(false);
                }}>

                <View className={"x-0  mx-auto my-auto bg-gray-300 w-1/2 h-1/4 p-5 rounded"}>
                    <View className={"flex justify-between h-full"}>
                        <View>
                            <Text className={"font-bold"}>Vælg Kalender:</Text>
                            <Text>her vises en liste af alle kalender på telefonen</Text>
                            <View className={"border-t mt-2 border-gray-200"}>

                                {userCalendars.map((calendar, index) => (
                                    <View key={index}
                                          className={"flex flex-row justify-between py-1 bg-gray-100 px-1 rounded mt-2 items-center"}>
                                        <Text>{calendar.name}</Text>
                                        <TouchableOpacity
                                            onPress={() => {addEventToCalendar(calendar)}}
                                        >
                                            <View className={"p-1 flex justify-center"}>
                                                <AntDesign name="rightcircleo" size={20} color="black"/>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}

                            </View>
                        </View>

                        <View className="border-t border-gray-200 pt-2 ">
                            <TouchableOpacity
                                onPress={() => {
                                    setChooseCalenderModal(false)
                                }}
                            >
                                <View className={" bg-blue-200 p-2 rounded"}>

                                    <Text className={"text-center"}>Luk</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            {/* NO ACCESS TO CALLENDAR MODAL */}
            <Modal
                visible={noAccessCalendarModal}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setNoAccessCalendarModal(!noAccessCalendarModal);
                }}
            >
                <View className={"x-0  mx-auto my-auto bg-gray-300 w-1/2 h-1/4 p-5 rounded"}>
                    <View className={"flex justify-between h-full"}>
                        <View>
                            <Text className={"font-bold"}>App har ikke adgang til calender:</Text>

                            <Text className={"mt-2"}>
                                Gå til settings og ændre calender permisions
                            </Text>
                        </View>

                        <View className={"flex justify-between"}>
                            <Button
                                title='Settings'
                                color='grey'
                                onPress={() => Linking.openSettings()}
                            />

                            <Button
                                title='Luk'
                                color='grey'
                                onPress={() => {
                                    setNoAccessCalendarModal(false)
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>


            <Button
                onPress={saveToCalender}
                title={"Save to calender"}>
            </Button>
        </>
    )
}

export default SaveToCalenderButton