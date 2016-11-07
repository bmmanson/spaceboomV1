import { addDiscoveredMessageToCollection } from './../async'; 
import { PushNotificationIOS, AlertIOS } from 'react-native';

export const addDiscoveredMessagesToCollectionIfValid = (messages) => {
	messages = messages.filter(m => m !== null);
	if (messages.length === 1) {
		addDiscoveredMessageToCollection(messages[0]);
		PushNotificationIOS.presentLocalNotification(
			{
				alertBody: "You discovered a new message! It was written by " + messages[0].message.author.name + ". Check it out!"
			}
		);
		AlertIOS.alert("", "You discovered a new message! It was written by " + messages[0].message.author.name + ".");
	} else if (messages.length > 1) {
		messages.forEach( (m) => addDiscoveredMessageToCollection(m) );
		PushNotificationIOS.presentLocalNotification(
			{
				alertBody: "You discovered " + messages.length + " new messages! Wow wow wow! Check 'em' out!"
			}
		);
		AlertIOS.alert("", "You just discovered " + messages.length + " new messages!");
	}
}