import React from 'react';
import { Text, View, PushNotificationIOS, AlertIOS, AppState } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Map } from './map';
import { MenuButton } from './menu-button';
import { styles } from './../styles/main';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { addDiscoveredMessageToCollection, rootUrl } from './../async';

export var LaunchPage = React.createClass({

getInitialState() {
    
    BackgroundGeolocation.configure({
		desiredAccuracy: 0,
		stationaryRadius: 20,
		distanceFilter: 25,
		stopTimeout: 1,       
		debug: false,
		stopOnTerminate: false,
		startOnBoot: true, 
		url: rootUrl + 'api/discovery/new/',
		batchSync: false,       
		autoSync: true,         
		maxDaysToPersist: 1,
		useSignificantChangesOnly: true,   
		headers: {              
			'Content-Type': 'application/json'
		},
		method: "POST"
		}, 
		function(state) {
			//console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
		  
			if (!state.enabled) {
		    	BackgroundGeolocation.start(function() {
		    		//console.log("- Start success");
		    	});
			}
		});

		// This handler fires whenever bgGeo receives an error
		BackgroundGeolocation.on('error', function(error) {
			var type = error.type;
			var code = error.code;
			alert(type + " Error: " + code);
		});

		BackgroundGeolocation.on('http', function (response) {
			//console.log("THE JSON BEFORE PARSE", response);
			let res = JSON.parse(response.responseText);
			//console.log('- Returned http post request response:', res);
			//console.log('APP STATE', AppState.currentState);
			if (res.id !== null) {
				addDiscoveredMessageToCollection(res);
				if (AppState.currentState === 'background') {
					PushNotificationIOS.presentLocalNotification(
						{
							alertBody: "You discovered a new message! It was written by " + res.message.author.name + ". Check it out!"
						}
					);
				} else if (AppState.currentState === 'active') {
					AlertIOS.alert("", "You discovered a new message! It was written by " + res.message.author.name + ".");
				}
			}
		})

    	return null;
	},

	render() {

		const goToPostMessage = () => Actions.newMessage();

		const goToMessageMaster = () => Actions.messageMaster();

	    return (
	    	<View style={styles.container}>
	    		<Map height={11} />

	        	<MenuButton buttonText={"Post a Message"} 
	        	buttonColor={"skyblue"}
	        	buttonAction={goToPostMessage} />
	        	
	        	<MenuButton buttonText={"Discovered Messages"} 
	        	buttonColor={"steelblue"}
	        	buttonAction={goToMessageMaster} />
	    	</View>
	    );
	}
});
