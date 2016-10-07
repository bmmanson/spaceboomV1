import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import { styles } from './../styles/main';
import { FBLogin } from './fb-login';


//#00BFFF
//steelblue


class LoginView extends Component {

	render(){
		return (
			<View style={{flex: 1, backgroundColor: 'steelblue'}}>
				<View style={{flex: 4}} />
				<View style={{flex: 4, alignItems:'center',
        			justifyContent:'center'}}>
				<Image source={require('./../img/logo.png')}
						style={{height: 110, 
								width: 110}} />
				</View>
				<View style={{flex: 1}} >
					<Text style={{textAlign: 'center', color: 'white', fontSize: 56}}>
						spaceboom
					</Text>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 16}}>
						a location-based messaging app
					</Text>
				</View>
				<View style={{flex: 9}} />
				<View style={{alignItems:'center',
        			justifyContent:'center'}}>
					<FBLogin />
				</View>
				<View style={{flex: 1}} />
				<View style={{flex: 1}}>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 14}}>
						created by Ben Manson, 2016
					</Text>
				</View>
				<View style={{flex: 1}} />
			</View>
		);
	}
}

export { LoginView };