import { StyleSheet, View, Button, Share } from 'react-native';

function shareEvent(title, link, description) {
    const shareOptions = {
        message: `Se det her event fra Kultunaut!\nTitel: ${title}.\nBeskrivelse: ${description}\nLink: ${link}`,
      };

    Share.share(shareOptions)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        err && console.log(err);
    });
};

export const ShareEventButton = ({title, link, description}) => (
    <View style={styles.button}>
        <Button 
        title='Share event'
        color='grey'
        onPress={() => shareEvent(title, link, description)}
        />
    </View>
);

const styles = StyleSheet.create({
    button: {
        width: 125,
        borderRadius: 20
    }
});
