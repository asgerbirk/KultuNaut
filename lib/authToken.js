import {getData, storeData} from "./storage";
import {
    AUTH_CLIENT_SECRET,
    AUTH_CLIENT_ID,
    AUTH_USERNAME,
    AUTH_PASSWORD,
} from "react-native-dotenv"


export async function getToken() {
    const tokenString = await getData("access_token")
    const token = JSON.parse(tokenString)
    if (token) {


        if (new Date(token.expireDate) > new Date()) {
            // TOKEN IS NOT OUTDATED
            return token.accessToken
        } else {
            // TOKEN IS OUTDATED
            const token = await requestToken()
            return token.accessToken
        }
    } else {
        // NO TOKEN IN STORAGE
        const token = await requestToken()
        return token.accessToken
    }
}

// REQUEST AND STORE TOKEN
async function requestToken() {
    const result = await fetchToken()

    const expireString = result.headers.get('expires')

    const expireDate = new Date(expireString);

    // Kulturnaut does not set status on invalid request, its always 200
    const data = await result.json()

    if (data.error) {
    } else {

        const dataToStore = {
            expireDate,
            accessToken: data.access_token
        }

        await storeData("access_token", JSON.stringify(dataToStore))

        return dataToStore
    }
}

async function fetchToken() {

    const url = `https://www.kultunaut.dk/perl/oauth2/token`

    const username = encodeURIComponent(AUTH_USERNAME)
    const password = encodeURIComponent(AUTH_PASSWORD)
    const clientID = encodeURIComponent(AUTH_CLIENT_ID)
    const clientSecret = encodeURIComponent(AUTH_CLIENT_SECRET)


    const uri = `?username=${username}&grant_type=password&password=${password}&client_id=${clientID}&client_secret=${clientSecret}`
    return await fetch(url + uri)
}

