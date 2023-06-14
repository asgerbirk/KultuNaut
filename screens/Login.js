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
                resizeMode='contain'
                className="w-80 h-28 mb-28 mt-12"
                />
            <TextInput
                onChangeText={setUsername}
                value={username}
                placeholder="username"
                className="w-64 h-10 m-3 p-2.5 border rounded-lg bg-white"
            />
            <TextInput
                onChangeText={setPassword}
                value={password}
                placeholder="password"
                className="w-64 h-10 m-3 p-2.5 border rounded-lg bg-white"
                secureTextEntry={true}
            />
            <View className="w-2/5 border border-white rounded mt-4">
                 <Button
                  title="Login"
                  color="#22293c"
                />
            </View>
           
    </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#22293C',
        alignItems: 'center',
      },
  });