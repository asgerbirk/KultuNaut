import {useState} from 'react';
import {View, Text, SafeAreaView, TextInput, Button, StyleSheet, Image} from "react-native";
import logo from '../assets/kultunaut_logo.png';

export const Login = ({}) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    async function submitLogin(){
        
    }

    return(
        <SafeAreaView style={styles.container}>
            <Image 
                source={logo}
                style={styles.logo}
                resizeMode='contain'
                />
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="username"
                className="w-64"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                className="w-64 text-white"
            />
            <Button
                  className="w-full"
                  title="Login"
                  color="#22293c"
                />
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10
    },
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
  });