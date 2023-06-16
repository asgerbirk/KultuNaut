import React, { useEffect } from 'react';
import { View, Image, StatusBar } from 'react-native';
import { FrontpageOverlayButton } from '../components/FrontpageOverlayButton';
import logo from '../assets/kultunaut_logo.png';
import buttonImage1 from '../assets/frontpage_image_1.jpg';
import buttonImage2 from '../assets/frontpage_image_2.jpg';
import buttonImage3 from '../assets/frontpage_image_3.jpg';
import {useFocusEffect, useNavigation} from "@react-navigation/native";

export const Home = () => {

  const navigation = useNavigation();


  return (
    <View className="flex-1 items-center bg-primary">


      <Image 
        source={logo}
        resizeMode='contain'
        className="w-80 h-28 my-7"
      />
      
      <View className="flex-col w-full px-2.5 items-center">
        <FrontpageOverlayButton
          source={buttonImage1}
          text='Find begivenheder'
          onPress={() => navigation.navigate('Search Event')}
        />
        <FrontpageOverlayButton
          source={buttonImage2}
          text='Kommende begivenheder'
          onPress={() => navigation.navigate('Event screen')}
        />
        <FrontpageOverlayButton
          source={buttonImage3}
          text='Dine begivenheder'
          onPress={() => navigation.navigate('Liked events')}
        />

      </View>
    </View>
  );
}

