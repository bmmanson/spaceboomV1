import React from 'react';
import { Text, View, NavigatorIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { Map } from './map';
import { MenuButton } from './menu-button';
import { styles } from './../styles/main';
import BackgroundGeolocation from 'react-native-background-geolocation';
import { checkForAndAddNewMessage } from './../async';

export var LaunchPage = React.createClass({

getInitialState() {
    
    BackgroundGeolocation.configure({
		desiredAccuracy: 0,
		stationaryRadius: 25,
		distanceFilter: 50,
		stopTimeout: 1,       
		debug: true,
		stopOnTerminate: false,
		startOnBoot: true, 
		url: 'http://localhost:1337/api/discovery/new/',
		batchSync: false,       
		autoSync: true,         
		maxDaysToPersist: 1,
		seSignificantChangesOnly: true,   
		headers: {              
			'Content-Type': 'application/json'
		},
		method: "POST"
		}, 
		function(state) {
			console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
		  
			if (!state.enabled) {
		    	BackgroundGeolocation.start(function() {
		    		console.log("- Start success");
		    	});
			}
		});

		// This handler fires whenever bgGeo receives a location update.
		BackgroundGeolocation.on('location', function(location) {
			console.log('- [js]location: ', JSON.stringify(location));
		});

		// This handler fires whenever bgGeo receives an error
		BackgroundGeolocation.on('error', function(error) {
			var type = error.type;
			var code = error.code;
			alert(type + " Error: " + code);
		});

		// This handler fires when movement states changes (stationary->moving; moving->stationary)
		BackgroundGeolocation.on('motionchange', function (location) {
			console.log('- [js]motionchanged: ', JSON.stringify(location));
		});

		// This event fires when a change in motion activity is detected
		BackgroundGeolocation.on('activitychange', function (activityName) {
			console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
		});

		// This event fires when the user toggles location-services
		BackgroundGeolocation.on('providerchange', function (provider) {
			console.log('- Location provider changed: ', provider.enabled);    
    	});

		BackgroundGeolocation.on('http', function (response) {
			console.log('- Returned http post request response:', response);
		})

    	return null;
	},

	render() {

		const goToPostMessage = () => Actions.newMessage();

		const goToMessageMaster = () => Actions.messageMaster();

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
});
