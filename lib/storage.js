import AsyncStorage from '@react-native-async-storage/async-storage';

export async function storeData(key, value) {
    try {
        return await AsyncStorage.setItem(`@${key}`, value)
    } catch (error) {

    }
}

export async function getData(key) {
    try {
        return await AsyncStorage.getItem(`@${key}`)
    } catch (error) {

    }
}

export async function remove(key) {
    try {
        await AsyncStorage.removeItem(`@${key}`)
    } catch (error) {

    }
}



