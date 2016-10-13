import React, { Component } from 'react';
import { 
	Text, 
	View, 
	TouchableHighlight,
	StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'; 

class UsernameContinueButton extends Component {

	render () {

		const buttonStatus = (canContinue) => {
			if (canContinue) {
				let buttonValidStyle = [style.button, style.buttonValid];
				return button(buttonValidStyle);
			} else {
				let buttonInvalidStyle = [style.button, style.buttonInvalid];
				return button(buttonInvalidStyle);
			}
		}

		const button = (buttonStyle) => {
			return (
				<View style={buttonStyle}>
					<TouchableHighlight onPress={()=>{
						submitUsername(this.props.userCanContinue);
					}}>
						<Text style={{color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>
							Start!
						</Text>
					</TouchableHighlight>
				</View>
			);
		}

		const submitUsername = (canSeeNextScreen) => {
			if (canSeeNextScreen) {
				Actions.initial();	
			} 
		}

		return (
			<View>
				{buttonStatus(this.props.userCanContinue)}
			</View>
		);
	}
}

const style = StyleSheet.create({
	button: {
		borderRadius: 3,
		width: 90,
		flex: .8,
		padding: 3,
	},
	buttonValid: {
		backgroundColor: '#EEC900'
	},
	buttonInvalid: {
		backgroundColor: '#CDBE70'
	}
})

export { UsernameContinueButton };