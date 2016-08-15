import React, {Component} from 'react';
import {
	Text,
	View,
	NavigatorIOS
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Map } from './map';
import { MenuButton } from './menu-button';
import { styles } from './../styles/main';
import { TitleBar } from './title-bar';
import { NewMessageView } from './new-message-view';
import { MessageMasterView } from './message-master-view';

import { checkForAndAddNewMessage } from './../async';

class LaunchPage extends Component {

	render() {

		const viewMessageRoute = {
			component: MessageMasterView,
			title: "Messsages"
		}

		const goToPostMessage = () => Actions.newMessage();

		const goToMessageMaster = () => Actions.messageMaster();

		navigator.geolocation.watchPosition(
			function (lastPosition) {
				let latitude = lastPosition.coords.latitude;
				let longitude = lastPosition.coords.longitude;
				checkForAndAddNewMessage(latitude, longitude);
			},
			function (error) {
				alert(error.message);
			},
			{
				enableHighAccuracy: true
			}
		)

	    return (
	    	<View style={styles.container}>
	    		<TitleBar text={"Spaceboom"} />
	    		<Map height={10} />
	        	<MenuButton buttonText={"Post a Message"} 
	        	buttonColor={"skyblue"}
	        	buttonAction={goToPostMessage} />
	        	
	        	<MenuButton buttonText={"Discovered Messages"} 
	        	buttonColor={"steelblue"}
	        	buttonAction={goToMessageMaster} />
	    	</View>
	    );
	}
}

export { LaunchPage };