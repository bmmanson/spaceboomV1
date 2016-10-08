import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import { UsernameInput } from './username-input';
import { UsernameToggle } from './username-toggle';

class NewUsernameView extends Component {

	render () {
		return (
			<View style={{flex: 1, backgroundColor: 'steelblue'}}>
				<View style={{flex: 1}} />
				<View style={{flex: 2, alignItems:'center',
        			justifyContent:'center'}}>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 16, marginBottom: 6}}>
						Hello, Ben! Welcome to Spaceboom!
					</Text>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 22, fontWeight: 'bold'}}>
						Choose a username:
					</Text>
				</View>
				<View style={{flex: .2}} />
				<View style={{flex: 2.5, 
							backgroundColor: 'white', 
							marginHorizontal: 18,
							borderStyle: 'solid',
							borderWidth: 1,
							borderColor: '#A8A8A8',
							borderRadius: 5}}>
					<View style={{flex: 1, borderStyle: 'solid', borderBottomWidth: 1, borderBottomColor:'#CFCFCF'}}>
						<UsernameInput />
					</View>
					<View style={{flex: 1}}>
						<UsernameToggle />
					</View>
				</View>
				<View style={{flex: 1}} />
				<View style={{flex: 3, alignItems:'center',
    			justifyContent:'center'}}>
					<Image source={require('./../img/logo.png')}
						style={{height: 56, 
								width: 56}} />
					<Text style={{textAlign: 'center', color: 'white', fontSize: 36}}>
						spaceboom
					</Text>
					<Text style={{textAlign: 'center', color: 'white', fontSize: 12}}>
						a location-based messaging app
					</Text>
				</View>
				<View style={{flex: 1}} />
				<View style={{flex: 8}} />
			</View>
		);
	}

}

export { NewUsernameView };