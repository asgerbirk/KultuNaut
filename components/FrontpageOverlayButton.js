import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const FrontpageOverlayButton = ({source, text, onPress}) => (
    <TouchableOpacity style={styles.button} className="w-11/12 h-32 m-2.5 items-center justify-center bg-black rounded-lg shadow-black border border-white shadow-lg" onPress={onPress}>
        <Image source={source} className="absolute w-full h-full object-cover rounded-lg opacity-70" />
        <Text style={styles.buttonText} className="absolute text-white font-bold text-xl">{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        elevation: 5, // Til Android
    },
    buttonText: {
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 }, 
        textShadowRadius: 10,
    },
});
