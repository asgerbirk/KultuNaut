import { StyleSheet, View, Button, Share } from 'react-native';

function shareEvent() {
    const shareOptions = {
        message: 'Se det her event fra Kultunaut:\nGoogle Event.\nLink: https://google.com',
      };

    Share.share(shareOptions)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        err && console.log(err);
    });
};

export const ShareEventButton = () => (
    <View style={styles.button}>
        <Button 
        title='Share event'
        color='grey'
        onPress={shareEvent}
        />
    </View>
);

const styles = StyleSheet.create({
    button: {
        width: 125,
        borderRadius: 20
    }
});
