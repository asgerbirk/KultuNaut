import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export const FrontpageOverlayButton = ({source, text}) => (
    <TouchableOpacity style={styles.button} >
        <Image source={source} style={styles.buttonImage} />
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        width: "90%",
        height: 125,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000',
        borderRadius: 10, 
        shadowColor: "#000", // Tilføjer skygge til iOS
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.8,
        elevation: 5, // Til Android
        borderColor: "white",
        borderWidth: 1,

    },
    buttonImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10, 
        opacity: 0.7,
    },
    buttonText: {
        position: 'absolute',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.9)',
        textShadowOffset: { width: -1, height: 1 }, 
        textShadowRadius: 10,
    },
});
