import React, { useState, useEffect } from 'react';
import data from "../utils/dummyData.json";
import {TextInput, View, Image, StyleSheet, Button, Text, ScrollView, TouchableOpacity} from "react-native";

export const DetailView = ({ routeData }) => {
    const itemId = 16499968;

    const [dummyData, setDummyData] = useState(data.result.map(item => ({ ...item })));

    const selectedItem = dummyData.find(item => item.Id === itemId);
    //const htmlString = selectedItem.Longdescription
    //const cleanedString = cleanAndFormatString(htmlString);
    selectedItem.Longdescription = cleanAndFormatString(selectedItem.Longdescription);
    selectedItem.Enddate = formatDate(selectedItem.Enddate);

    function cleanAndFormatString(inputString) {
      // Remove HTML tags using regular expressions
      var cleanedString = inputString.replace(/<.*?>/g, '');
    
      // Add line breaks and spacing
      var formattedString = cleanedString.replace(/([a-zæøåÆØÅ])([A-ZÆØÅ])/g, '$1.\n$2');
      formattedString = formattedString.replace(/\.(?=\w)/g, '. ');
    
      return formattedString.trim();
    }
    function formatDate(dateString){
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
      const formattedDate = date.toLocaleDateString('da-DK', options);
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      console.log(selectedItem.Enddate);
      console.log(capitalizedDate);
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
      return(
          <View className="bg-white px-4">
            <Text className="text-lg pt-3 font-bold">Begivenheden</Text>
            <View className="pt-2">
              <Text>{item.Longdescription}</Text>
            </View>
          </View>
      );
    }
    const RenderButton = ({}) => {
      return(
        <View className="bg-gray-800 px-4" style={styles.container}>
          <View>
            <Button
                  title="Køb billet"
                  color="#22293c"
                  style={styles.button}
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'gray',
    paddingHorizontal: 4,
  }
})