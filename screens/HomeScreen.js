import * as React from 'react';
import {Button, View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
export const HomeScreen = () => {

    const navigation = useNavigation();

    return (
        <View className="flex-1 items-center justify-center">
            <Button
                title="Go to All Events"
                onPress={() => navigation.navigate('All upcoming Events')}
            />
             <Button
                title="Go to Home"
                onPress={() => navigation.navigate('HomeTwo')}
            />
            <Button
                title="Go to EventComponent component"
                onPress={() => navigation.navigate('Events component')}
            />
        </View>
    );
}
