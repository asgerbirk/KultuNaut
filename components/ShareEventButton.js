import { TouchableOpacity, Text, Share } from 'react-native';

function shareEvent(title, link, description) {

    let messageToShare = "";

    if(link === undefined) {
        messageToShare = `Se det her event fra Kultunaut!\n\nTitel: ${title}.\n\nBeskrivelse: ${description}`;
    } else {
        messageToShare = `Se det her event fra Kultunaut!\n\nTitel: ${title}.\n\nBeskrivelse: ${description}\n\nLink: ${link}`;
    }
    
    const shareOptions = {
        message: messageToShare
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
        className="w-32 h-12 bg-black rounded justify-center items-center"
        onPress={() => shareEvent(title, link, description)}
    >
        <Text className="text-white text-base font-bold">Del begivenhed</Text>
    </TouchableOpacity>
);
