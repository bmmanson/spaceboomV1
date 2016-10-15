import React, { Component } from 'react';
import { Text, View, TouchableHighlight, AlertIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { LoginManager } from 'react-native-fbsdk';

import { store } from './../store';
import { deleteAllMessages, deleteAllComments } from './../actions/';

class SettingsLogOut extends Component {

	render () {
		return (
			<View style={{height: 40, 
						flexDirection: 'row',  
						borderStyle: 'solid', 
						borderTopColor: '#E8E8E8', 
						borderTopWidth: 1}}>
				<View style={{flex: .7}} />
				<View style={{flex: .3, alignItems:'center', justifyContent:'center'}}>
					<View style={{width: 90,
								height: 25,
								backgroundColor:'#CD2626', 
								borderRadius: 4,
								padding: 3,
								alignItems:'center', 
								justifyContent:'center'}}>
						<TouchableHighlight style={{flex: 1}} onPress={() => {
							logOut();
						}}>
							<Text style={{color: 'white', fontWeight: 'bold', marginHorizontal: 6}}>
								LOG OUT
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		);
	}
}

const logOut = () => {
	AlertIOS.alert(
		"Log Out", 
		"Are you sure you want to log out?",
		[
			{
			text: "No", 
			onPress: () => console.log("User didn't log out"), 
			style: "cancel"
			},
			{
			text: "Yes", 
			onPress: function () {
				store.dispatch(deleteAllMessages());
    			store.dispatch(deleteAllComments());
    			LoginManager.logOut();
    			Actions.login();
				}
			}
		]
	)
}

export { SettingsLogOut };