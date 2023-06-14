import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FrontpageOverlayButton } from '../components/FrontpageOverlayButton';
import logo from '../assets/kultunaut_logo.png';
import buttonImage1 from '../assets/frontpage_image_1.jpg';
import buttonImage2 from '../assets/frontpage_image_2.jpg';
import buttonImage3 from '../assets/frontpage_image_3.jpg';
import {useNavigation} from "@react-navigation/native";

export const Home = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image 
        source={logo}
        style={styles.logo}
        resizeMode='contain'
      />
      
      <View style={styles.buttonContainer}>
        <FrontpageOverlayButton
          source={buttonImage1}
          text='Find begivenheder'
          onPress={() => navigation.navigate('All upcoming Events')}
        />
        <FrontpageOverlayButton
          source={buttonImage2}
          text='Kommende begivenheder'
          onPress={() => navigation.navigate('Events component')}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22293C',
    alignItems: 'center',

  },
  logo: {
    width: 300,
    height: 100,
    marginTop: 25,
    marginBottom: 25,
  },
  buttonContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingHorizontal: 10,
    alignItems: "center"
  }
});
