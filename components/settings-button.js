import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux'; 

class SettingsButton extends Component {

	render () {
		return (
			<View style={{flex: .2}}>
				<View style={{
					borderRadius: 3,
					borderStyle: "solid",
					borderWidth: 2,
					borderColor: '#B9D3EE',
					backgroundColor: '#F0F8FF',
					justifyContent: 'center', 
			 		alignItems: 'center',
			 		height: 28,
			 		marginTop: 0
				}}>
					<TouchableHighlight style={{flex: 1, justifyContent: 'center', 
			 		alignItems: 'center'}} onPress={()=>{
						Actions.Settings();
					}}>
						<Text style={{fontWeight: 'bold', color: '#6C7B8B', fontSize: 10}}>
							SETTINGS
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		);
	}
}

export { SettingsButton };