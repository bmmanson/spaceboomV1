import React, { Component } from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';

import { UsernameButton } from './username-button';

class UsernameInput extends Component {

	constructor(props) {
		super(props);
		this.state = {
			username:'',
			valid: false
		};
	}

	render() {

		return (
			<View style={{flex: 1, flexDirection: 'row'}}>
				<View style={{flex: .8}}>
					<TextInput
						style={{height: 30, marginTop: 4, marginLeft: 6, marginTop: 8}} 
						placeholder={"Your username here:"}
						placeholderTextColor={"#C7C7C7"}
						value={this.state.username}
						onChangeText={(username) => {
							if (username.length < 25) {
								this.setState({username})
							}
							let re = /[^a-z0-9]/gi;
							if (username.length < 3 || username.match(re)) {
								this.setState({valid: false});
							} else {
								this.setState({valid: true});
							}
						}} />
				</View>
				<View style={{flex: .2, 
							alignItems:'center',
							justifyContent:'center'}}>
					<UsernameButton username={this.state} />
				</View>
			</View>
		);
	}
}

export { UsernameInput };
