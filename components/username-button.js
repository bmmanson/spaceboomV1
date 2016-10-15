import React, { Component } from 'react';
import { 
	Text, 
	View, 
	TouchableHighlight, 
	AlertIOS, 
	Image,
	StyleSheet } from 'react-native';

import { store } from './../store';
import { changeAuthorNameOfSentMessages } from './../actions';

import { submitNewUsername } from './../async/';

class UsernameButton extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sendingUsername: false,
		};
	}

	render() {

		const buttonStatus = (username, state) => {
			if (state.sendingUsername) {
				return spinner;
			} else if (username.valid) {
				let buttonValidStyle = [style.button, style.buttonValid];
				return button(buttonValidStyle);
			} else if (!username.valid) {
				let buttonInvalidStyle = [style.button, style.buttonInvalid];
				return button(buttonInvalidStyle);
			}
		}

		const button = (buttonStyle) => {
			return (
				<View style={buttonStyle}>
					<TouchableHighlight onPress={()=>{
						submitUsername(this.props.username);
					}}>
						<Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
							SEND
						</Text>
					</TouchableHighlight>
				</View>
			);
		}

		const spinner = (
			<Image source={require('./../img/spinner.gif')}
			style={{height: 24, 
					width: 24}} />
		);

		const submitUsername = (username) => {
			if (username.valid) {
				this.setState({sendingUsername: true});
				submitNewUsername(username.username)
				.then( (data) => {
					if (!data.valid) {
						this.setState({sendingUsername: false});
						AlertIOS.alert("", "Invalid username. Somebody else is already using that username or it is inappropriate.");
					} else {
						this.setState({sendingUsername: false});
						store.dispatch(changeAuthorNameOfSentMessages(data.username));
						AlertIOS.alert("", "You have successfully added your username.");
					}
				})
			} else {
				AlertIOS.alert("", "Invalid username: cannot contain special characters or spaces and must be at least 3 characters long.");
			}
		}

		return (
			<View>
				{buttonStatus(this.props.username, this.state)}
			</View>
		);
	}
}

const style = StyleSheet.create({
	button: {
		borderRadius: 4,
		width: 50,
		padding: 3,
	},
	buttonValid: {
		backgroundColor: '#EEC900'
	},
	buttonInvalid: {
		backgroundColor: '#CDBE70'
	}
})


export { UsernameButton };