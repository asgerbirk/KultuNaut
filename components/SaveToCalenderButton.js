import {Button, Modal, Text, View, Linking, Pressable} from "react-native";
import {useEffect, useState} from "react";
import * as Calendar from 'expo-calendar';


const SaveToCalenderButton = (props) => {
    const eventInfo = props.event

    const [modalVisible, setModalVisible] = useState(false);


    // DOCS
    // https://docs.expo.dev/versions/latest/sdk/calendar/

    function saveToCalender() {
        (async () => {
            const { status } = await Calendar.requestCalendarPermissionsAsync()
            if (status === 'granted') {

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
                console.log(response)


                //const response = await Calendar.createEventAsync(calendarId, eventData)
                //console.log(response)


            } else if (status === "denied"){
                setModalVisible(true)
            }
        })()

    }

    useEffect(() => {

    }, [])


    return (
        <>
            <Modal
                visible={modalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
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
                                onPress={() => linking.openSettings()}
                            />

                            <Button
                                title='Luk'
                                color='grey'
                                onPress={() => {setModalVisible(false)}}
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