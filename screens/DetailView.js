import React, { useState, useEffect } from 'react';
import data from "../utils/dummyData.json";
import {View, Image, StyleSheet, Button, Text, ScrollView, TouchableOpacity, useWindowDimensions} from "react-native";
import HTML from "react-native-render-html"

export const DetailView = ({ route }) => {
    const {eventId} = route.params;
    const itemId = Number(eventId);

    const [dummyData, setDummyData] = useState(data.result.map(item => ({ ...item })));
    const selectedItem = dummyData.find(item => item.Id === itemId);

    selectedItem.Enddate = formatDate(selectedItem.Enddate);

    function formatDate(dateString){
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
      const formattedDate = date.toLocaleDateString('da-DK', options);
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      return capitalizedDate;
    }
    
    const RenderImage = ({item}) => {
      return(
        <View>
          <Image source={{uri: item.Image}} className="h-56 w-full" resizeMode={"cover"}/>
        </View>
      )
    }

    const RenderHeadline = ({item}) => {
      return(
        <View className="pl-3 pt-7 bg-gray-800">
          <View className="pb-2">
            <Text className="text-white font-bold text-xl">{item.Title}</Text>
              <View>
              <Text className="text-slate-400 text-xl font-medium">{item.LocationName}</Text>
            </View>
          </View>
          <View className="pb-1.5">
            <Text className="text-slate-400 text-lg">{item.LocationAddress}</Text>
          </View>
          <View className="pb-4">
            <Text className="text-slate-400 text-lg">{item.Enddate}</Text>
          </View>
        </View>
      );
    };
    const RenderDescription = ({item}) => {
      const { width } = useWindowDimensions();
      return(
          <View className="bg-white px-4">
            <Text className="text-lg pt-3 font-bold">Begivenheden</Text>
            <View className="pt-2 pb-4">
              <HTML source={{html: item.Longdescription}} contentWidth={width} />
            </View>
          </View>
      );
    }
    const RenderButton = ({}) => {
      return(
        <View className="bg-gray-800 px-4" style={styles.container}>
          <View style={styles.buttonContainer} className="w-fit">
            <Button
                  className="w-full"
                  title="Køb billet"
                  color="#22293c"
                />
          </View>
        </View>
      )
    }
    return(
    <ScrollView>
        <RenderImage item={selectedItem} />
        <RenderHeadline item={selectedItem} />
        <RenderDescription item={selectedItem} />
        <RenderButton />
    </ScrollView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60, // Adjust this value to your button's height
  },
  buttonContainer: {
    left: 0,
    right: 0,
    backgroundColor: 'gray',
    position:'absolute',
    bottom:0,
    alignSelf:'flex-end'
  },
})