import React, { Component } from 'react';
import {
	Text,
	TouchableHighlight,
	NavigatorIOS,
	Image,
	View
} from 'react-native';

import { addSentMessage, updateNewMessageText, downloadingOn, downloadingOff } from './../actions/';
import { postNewMessageToServer } from './../async/';
import { store } from './../store.js';

class SubmitMessageButton extends Component {

	render () {

		const submitMessage = (text) => {
			if (text.length < 4) {
				alert("That message isn't long enough! Write a longer message and try again!");
			} else {
				store.dispatch(downloadingOn());
				navigator.geolocation.getCurrentPosition(
					function (initialPosition) {
						let latitude = parseFloat(initialPosition.coords.latitude); 
						let longitude = parseFloat(initialPosition.coords.longitude);

						return postNewMessageToServer(
							text,
							latitude,
							longitude
						)
						.then((response) => {
							alert("Message sent! Other people can now discover it!");
							store.dispatch(addSentMessage(
								response.id,
								response.text, 
								response.author.name,
								response.author.authorPic,
								response.author.id,
								parseFloat(response.latitude),
								parseFloat(response.longitude),
								response.locationName,
								response.city,
								0,
								0,
								false,
								response.createdAt)
							)
							store.dispatch(updateNewMessageText(""));
							//console.log("COORDS. LAT:", response.latitude, "LONG:", response.longitude);
							store.dispatch(downloadingOff());
						})
					},
					(error) => alert(error.message),
					{enableHighAccuracy: true}
				)
			}
		}

		const buttonOrSpinner = (downloading) => {
			if (!downloading) {
				return (
					<View style={{flex: 1, 
								backgroundColor: "skyblue", 
								borderRadius: 4,
								width: 60,
								padding: 3}}>
						<TouchableHighlight 
							onPress={() => submitMessage(this.props.messageText)} 
							style={{  
								justifyContent: 'center', 
								alignItems: 'center'}}>
							<Text style={{
								flexDirection: 'column',
								textAlign: 'center',
								justifyContent: 'center',
								alignItems: 'center',
								color: 'white',
								fontWeight: 'bold'}}>
									{"SEND"}
							</Text>
						</TouchableHighlight>
					</View>
				);		
			} else {
				return (
					<View style={{justifyContent: 'center',
								alignItems: 'center'}}>
						<Image source={require('./../img/spinner.gif')}
						style={{height: 24, 
								width: 24}} />
					</View>
				);
			}
		}

		return (
			<View>
			{buttonOrSpinner(this.props.downloading)}
			</View>
		);
	}
}

export { SubmitMessageButton };