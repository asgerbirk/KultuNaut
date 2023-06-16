import { TouchableOpacity, Text, Share } from 'react-native';

function shareEvent(title, link, description) {
    const shareOptions = {
        message: `Se det her event fra Kultunaut!\n\nTitel: ${title}.\n\nBeskrivelse: ${description}\n\nLink: ${link}`,
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
    <TouchableOpacity 
        className="w-32 h-12 bg-gray-500 rounded justify-center items-center"
        onPress={() => shareEvent(title, link, description)}
    >
        <Text className="text-white text-base">Share event</Text>
    </TouchableOpacity>
);
