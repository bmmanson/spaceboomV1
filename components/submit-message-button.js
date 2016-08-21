import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS
} from 'react-native';

import { addSentMessage } from './../actions/';
import { postNewMessageToServer } from './../async/';
import { store } from './../store.js';

class SubmitMessageButton extends Component {
	
	_submitMessage (text) {
		navigator.geolocation.getCurrentPosition(
			function (initialPosition) {
				let latitude = initialPosition.coords.latitude; 
				let longitude = initialPosition.coords.longitude;

				return postNewMessageToServer(
					text,
					null,
					latitude,
					longitude,
					"Apple",
					"California, CA"
				)
				.then((response) => response.json())
				.then((response) => {
					alert("Message sent! Other people can now discover it!");
					store.dispatch(addSentMessage(
						response.text, 
						response.author.name,
						response.author.authorPic,
						response.latitude,
						response.longitude,
						response.locationName,
						response.city)
					)
					console.log("COORDS. LAT:", response.latitude, "LONG:", response.longitude);
				})
			},
			(error) => alert(error.message),
			{enableHighAccuracy: true}
		)

	}

	render () {

		return (
			<TouchableHighlight 
				onPress={this._submitMessage.bind(this, this.props.messageText)} 
				style={{flex:1, backgroundColor: "skyblue"}}>
				<Text style={{
	   						flexDirection: 'column',
	    					textAlign: 'center',
	    					justifyContent: 'center',
	    					alignItems: 'center',
	    					color: 'white',
	    					fontWeight: 'bold',
	    					fontSize: 26}}>
					{"Submit"}
				</Text>
			</TouchableHighlight>
		);
	}
}

export { SubmitMessageButton };