import * as React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
export const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View>
            <Button
                title="Go to All Events"
                onPress={() => navigation.navigate('All upcoming Events')}
            />
        </View>
    );
}
