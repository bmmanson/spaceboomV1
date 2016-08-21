import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { styles } from './../styles/main';
import { FBLogin } from './fb-login';

class LoginView extends Component {
	render(){
		return (
			<View style={styles.container}>
				<View style={{flex: 2}} />
				<View style={{flex: 3}}>
					<Text style={{textAlign: 'center'}}>Welcome to Spaceboom</Text>
					<Text style={{textAlign: 'center'}}>Spaceboom is a location-based messaging app!</Text>
					<Text style={{textAlign: 'center'}}>Post messages using the app, and others will the app will be able to discover them in the location that you wrote them!</Text>
					<Text style={{textAlign: 'center'}}>Or find the messages of users by wandering around discovering them!</Text>
				</View>
				<View style={{flex: 2}}>
				</View>
				<FBLogin />
				<View style={{flex: 2}} />
			</View>
		);
	}
}

export { LoginView };