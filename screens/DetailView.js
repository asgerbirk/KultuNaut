import React from 'react';
import {View, Image, Button, Text, ScrollView, useWindowDimensions, Linking, Platform, Pressable, StyleSheet, TouchableOpacity} from "react-native";
import HTML from "react-native-render-html"
import SaveToCalenderButton from "../components/SaveToCalenderButton";
import { Feather } from '@expo/vector-icons';
import { ShareEventButton } from "../components/ShareEventButton";
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';


export const DetailView = ({ route }) => {

    const navigation = useNavigation();

    const { itemData } = route.params;

    const selectedItem = itemData;
    const originalEvent = JSON.parse(JSON.stringify(selectedItem))

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

          <TouchableOpacity className="w-20 h-10 ml-2 mt-2 bg-black rounded justify-center items-center z-1 absolute" onPress={() => navigation.goBack()}>
              <Text className="text-white text-base font-bold">Tilbage</Text>
          </TouchableOpacity>

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

          <View className="pb-2 flex-row ml-1 mb-2">
              <SaveToCalenderButton event={originalEvent}/>
          </View>

            <View className="pb-4">
            <ShareEventButton title={item.Title} link={item.Link} description={item.Shortdescription} />
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
            {item.Longdescription ? (
                <HTML source={{html: item.Longdescription}} contentWidth={width} />
            ) : (
                <Text>Ingen beskrivelse.</Text>
            )}
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
    const RenderMap = ({item}) => {

      let latitude;
      let longitude;

      if(item.Lon == null || item.Lat == null){
        latitude = 55.676098;
        longitude = 12.568337;
      } else {
        latitude = item.Lat;
        longitude = item.Lon;
      }

      return(
        <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
         >
         <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            title={item.Title}
            description={item.LocationName}
          />
        </MapView>
      </View>
      );
    };
    return(
    <ScrollView>
        <RenderImage item={selectedItem} />
        <RenderHeadline item={selectedItem} />
        <RenderDescription item={selectedItem} />
        <RenderMap item={selectedItem} />
        <RenderButton item={selectedItem}/>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 60, 
  },
  buttonContainer: {
    left: 0,
    right: 0,
    backgroundColor: 'gray',
    position:'absolute',
    bottom:0,
    alignSelf:'flex-end'
  },
  mapContainer: {
    height: 300,
    width: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject, // Makes the map fill the entire mapContainer View
  },
})