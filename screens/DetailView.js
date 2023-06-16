import React, { useState, useEffect } from 'react';
import data from "../utils/dummyData.json";
import {View, Image, Button, Text, ScrollView, useWindowDimensions, Linking, Platform, Pressable} from "react-native";
import HTML from "react-native-render-html"
import { Feather } from '@expo/vector-icons'; 

export const DetailView = ({ route }) => {
    const {eventId} = route.params;
    const itemId = Number(eventId);

    const [dummyData, setDummyData] = useState(data.result.map(item => ({ ...item })));
    const selectedItem = dummyData.find(item => item.Id === itemId);

    function formatDate(dateString){
      const [day, month, year] = dateString.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'};
      const formattedDate = date.toLocaleDateString('da-DK', options);
      const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
      return capitalizedDate;
    }

    const openMaps = (lat, lon) => {
      let url = '';

      if(Platform.OS === 'ios') {
        url = `http://maps.apple.com/?q=${lat},${lon}`;
      }else{
        url = `geo:${lat},${lon}?q=${lat},${lon}`;
      }

      Linking.canOpenURL(url).then((supported) => {
        if(supported){
          return Linking.openURL(url);
        } else {
          const browserLink = `https://maps.google.com/?q=${lat},${lon}`;
          return Linking.canOpenURL(browserLink).then((supported) => {
            if (supported) {
              return Linking.openURL(browserUrl);
            } else {
              console.error('Cannot open Google Maps in browser');
            }
          })
        }
      })
    }
    const openWebPage = (url) => {
      console.log(url);
      Linking.canOpenURL(url).then((supported) => {
        if(!supported){
          console.log("Can't handle URL: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
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
          <View className="pb-2 mb-1">
            <Text className="text-white font-bold text-xl">{item.Title}</Text>
              <View className="mt-2">  
              <Text className="text-slate-400 text-xl font-medium">{item.LocationName}</Text>
            </View>
          </View>
          <View className="pb-1.5 flex-row ml-1 mb-2">
            <Feather name="map-pin" size={24} color="white" />
            <Pressable onPress={() => openMaps(item.Lat, item.Lon)}>
              <Text className="text-white text-lg ml-3">{item.LocationAddress}</Text>
            </Pressable>
          </View>
          <View className="pb-4 flex-row ml-1 mb-2">
            <Feather name="calendar" size={24} color="white" />
            <Text className="text-white text-lg ml-3">{item.Enddate}</Text>
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
    const RenderButton = ({item}) => {
      return(
        <View className="bg-primary px-4 mt-10 flex">
          <View className="w-fit left-0 right-0 absolute bottom-0 self-end">
            <Button
                  className="w-full"
                  title="Besøg"
                  color="#22293c"
                  onPress={() => openWebPage(item.Link)}
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
        <RenderButton item={selectedItem}/>
    </ScrollView>
    )
}