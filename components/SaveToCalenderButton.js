import {Button, Linking, Modal, Text, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import * as Calendar from 'expo-calendar';
import {AntDesign, Feather} from '@expo/vector-icons';
import {dateFormat} from "../lib/dateFormater";

const SaveToCalenderButton = (props) => {


    // MODAL
    const [noAccessCalendarModal, setNoAccessCalendarModal] = useState(false);
    const [chooseCalenderModal, setChooseCalenderModal] = useState(false);

    // TOAST
    const [toastError, setToastError] = useState(false)
    const [toastSuccess, setToastSuccess] = useState(false)

    // CALENDAR
    const [userCalendars, setUserCalendars] = useState([]);

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
        return await Calendar.createCalendarAsync(details)
    }

    async function addEventToCalendar(calendar) {
        const eventInfo = props.event

        const startDate = dateFormat(eventInfo.Startdate)
        const endDate = dateFormat(eventInfo.Enddate)

        const location = `${eventInfo.LocationAddress} ${eventInfo.LocationCity} ${eventInfo.LocationCountry}`

        const eventData = {
            title: eventInfo.Title,
            startDate,
            endDate,
            timeZone: 'Europe/Copenhagen',
            location,
            notes: eventInfo.Shortdescription,
            alarms: [{relativeOffset: -30}],
        }


        //const response = await Calendar.createEventAsync(calendar.id, eventData)

        try {
            await Calendar.createEventAsync(calendar.id, eventData)
        } catch {
            setToastError(true)
            return
        }

        setToastSuccess(true)
    }


    function saveToCalender() {
        (async () => {
            const {status} = await Calendar.requestCalendarPermissionsAsync()
            if (status === 'granted') {


                const allCalendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
                const calendars = allCalendars.filter(calendar => calendar.accessLevel !== 'read')


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

                <View className={"x-0 mx-auto my-auto bg-gray-50 w-3/4 h-3/4 p-5 rounded"}>
                    <View className={"flex justify-between   h-full "}>
                        <View>

                            {toastError &&
                                <View className={`border-red-400 border rounded  w-full p-3 transition-all   mb-3`}>
                                    <Text className={`text-red-700 text-center `}>Kunne ikke gemme event</Text>
                                </View>
                            }

                            {toastSuccess &&
                                <View className={` border-green-400  border rounded   w-full p-3 transition-all   mb-3`}>
                                    <Text className={`text-green-700 text-center `}>Event er tilføjet til kalender</Text>
                                </View>
                            }

                            <Text className={"font-bold"}>Vælg Kalender:</Text>
                            <Text>her vises en liste af alle kalender på telefonen</Text>
                            <View className={"border-t mt-2 border-gray-200"}>

                                {userCalendars.map((calendar, index) => (
                                    <View key={index}
                                          className={"flex flex-row justify-between py-1 bg-gray-100 px-1 rounded mt-2 items-center"}>
                                        <Text>{calendar.name}</Text>
                                        <TouchableOpacity
                                            onPress={async () => {
                                                await addEventToCalendar(calendar)
                                            }}
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
                                    setToastSuccess(false)
                                    setToastError(false)
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


            <TouchableOpacity
                className={"flex-row"}
                onPress={saveToCalender}>
                    <Feather name="calendar" size={24} color="white" />
                    <Text className="text-white text-lg ml-3">{props.event.Startdate}</Text>
            </TouchableOpacity>

        </>
    )
}

export default SaveToCalenderButton