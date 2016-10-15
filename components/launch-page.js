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
import { checkForAndAddNewMessage } from './../async';

class LaunchPage extends Component {

	render() {

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
	    		<Map height={13} />

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